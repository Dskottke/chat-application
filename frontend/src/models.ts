export type AppUser = {
    name: string,
    avatar: string,
}
export type AppUserAuthentication = {
    appUser: AppUser,
    pendingToken: string
}

export type AppContext = {
    currentAppUsers?: AppUser[],
    setCurrentAppUsers?: (currentAppUsers: AppUser[]) => void,
    appUser?: AppUser,
    setAppUser?: (appUser: AppUser) => void,
    setAppUserAuthentication?: (appUserAuthentication: AppUserAuthentication) => void,
    appUserAuthentication?: AppUserAuthentication
}
export type MessageFromUser = {
    pendingToken?: string,
    chatMessage?: string
}
export type MessageToUser = {
    chatMessage: string,
    currentAppUsers: AppUser[]
}
