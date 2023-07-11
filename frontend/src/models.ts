export type AppUser = {
    name: string,
    avatar: string,
}

export type AppContext = {
    appUser?: AppUser,
    setAppUser?: (appUser: AppUser) => void,
    message?: string,
    setMessage?: (message: string) => void,
    messages?: string[],
    setMessages?: (messages: string[]) => void,
}