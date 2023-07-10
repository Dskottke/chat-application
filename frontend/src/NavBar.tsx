import React from 'react';
import {useGlobalContext} from "./Context";
import {AppContext} from "./models";

function NavBar() {
   const {appUser} : AppContext  = useGlobalContext()

    return (
        <nav className="navigation">
            <p>
                Logged in as <span className={"highlight"}>{appUser?.name}</span>
            </p>
            <img className={"navigation-logo"} src={appUser?.avatar} alt={appUser?.name}/>
        </nav>
    );
}

export default NavBar;