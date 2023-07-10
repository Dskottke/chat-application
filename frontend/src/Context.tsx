import React, {createContext, ReactNode, useContext, useMemo, useState} from 'react';
import {AppContext, AppUser} from "./models";

export const GlobalContext = createContext({})
export const useGlobalContext = () => useContext(GlobalContext)

function Context(props: { children: ReactNode }) {
    const [appUser, setAppUser] = useState<AppUser>();

    const value : AppContext = useMemo(() => {
        return {
            appUser,
            setAppUser
        }
    },[appUser])

        return (
        <GlobalContext.Provider value={value}>
            {props.children}
        </GlobalContext.Provider>
    );
}

export default Context;