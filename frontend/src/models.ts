import App from "./App";

export type AppUser = {
    name : string,
    avatar : string,
}

export type AppContext = {
    appUser? : AppUser,
    setAppUser?: (appUser : AppUser) => void
}