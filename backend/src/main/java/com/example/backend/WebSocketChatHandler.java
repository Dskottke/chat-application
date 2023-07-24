package com.example.backend;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class WebSocketChatHandler extends TextWebSocketHandler {
    private final Logger logger = LoggerFactory.getLogger(WebSocketChatHandler.class);
    private final Set<WebSocketSession> sessions = new HashSet<>();
    private final Map<String, AppUser> pendingTokens = new HashMap<>();
    private final Map<WebSocketSession, AppUser> userBySession = new HashMap<>();
    private final ObjectMapper objectMapper;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        super.afterConnectionEstablished(session);
        sessions.add(session);
        logger.info("new session: {}", session);
    }


    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        super.handleTextMessage(session, message);
        var txt = message.getPayload();
        MessageFromUser messageFromUser;
        try {
            messageFromUser = objectMapper.readValue(txt, MessageFromUser.class);
        } catch (JsonProcessingException e) {
            logger.warn("Could not parse message from user");
            return;
        }
        String pendingToken = messageFromUser.pendingToken();
        if (pendingToken != null) {
            validateSession(session, pendingToken);
        }
        if (messageFromUser.chatMessage() != null) {
            sendMessagesToAllUser(session, messageFromUser);
        }

        sendAllCurrentUser(session);
    }

    private void sendMessagesToAllUser(WebSocketSession session, MessageFromUser messageFromUser) throws IOException {
        String chatMessage = messageFromUser.chatMessage();
        var currentUser = userBySession.get(session);
        if(currentUser == null) {
            logger.warn("No current user");
            return;
        }
        MessageToUser messageToUser = MessageToUser.builder()
                .chatMessage(new ChatMessage(chatMessage, currentUser, LocalDateTime.now()))
                .build();
        TextMessage textMessage = new TextMessage(objectMapper.writeValueAsString(messageToUser));
        logger.info("new chat message received: {}", chatMessage);
        for (WebSocketSession sess : sessions) {
            sess.sendMessage(textMessage);
        }
    }


    private void validateSession(WebSocketSession session, String pendingToken) throws IOException {
        var appUser = pendingTokens.get(pendingToken);
        if (appUser == null) {
            logger.warn("Invalid pending token");
            return;
        }
        if (userBySession.containsValue(appUser)) {
            for (var entry : userBySession.entrySet()) {
                if (entry.getValue().equals(appUser)) {
                    userBySession.remove(entry.getKey());
                    break;
                }
            }
        }
        userBySession.put(session, appUser);
        session.getAttributes().put("currentUser", appUser);
        pendingTokens.remove(pendingToken);
    }


    private void sendAllCurrentUser(WebSocketSession session) throws IOException {
        var currentUser = userBySession.get(session);
        var currentAppUsers = userBySession.values()
                .stream()
                .filter(user -> !user.equals(currentUser))
                .toList();
        MessageToUser messageToUser = MessageToUser.builder().currentAppUsers(currentAppUsers).build();
        TextMessage textMessage = new TextMessage(objectMapper.writeValueAsString(messageToUser));
        session.sendMessage(textMessage);
    }


    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
        super.afterConnectionClosed(session, status);
        sessions.remove(session);
        logger.info("session closed: {}", session);
    }

    public String generatePendingToken(AppUser appUser) {
        if (pendingTokens.containsValue(appUser)) {
            for (var entry : pendingTokens.entrySet()) {
                if (entry.getValue().equals(appUser)) {
                    pendingTokens.remove(entry.getKey());
                    break;
                }
            }
        }
        var token = UUID.randomUUID().toString();
        pendingTokens.put(token, appUser);
        return token;
    }
}

