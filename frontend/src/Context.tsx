import React, {createContext, ReactNode, useContext, useMemo, useState} from 'react';
import {AppContext, AppUser, AppUserAuthentication} from "./models";

export const GlobalContext = createContext({})
export const useGlobalContext = () => useContext(GlobalContext)

function Context(props: { children: ReactNode }) {
    const [currentAppUsers, setCurrentAppUsers] = useState<AppUser[]>([])
    const [appUserAuthentication, setAppUserAuthentication] = useState<AppUserAuthentication>();
    const appUser = appUserAuthentication?.appUser;
    console.log(appUserAuthentication?.pendingToken)
    const value: AppContext = useMemo(() => {
        return {
            setCurrentAppUsers,
            currentAppUsers,
            appUser,
            setAppUserAuthentication,
            appUserAuthentication
        }
    }, [appUser, currentAppUsers, appUserAuthentication])

    return (
        <GlobalContext.Provider value={value}>
            {props.children}
        </GlobalContext.Provider>
    );
}

export default Context;