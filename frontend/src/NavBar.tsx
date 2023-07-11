import React from 'react';
import {useGlobalContext} from "./Context";
import {AppContext} from "./models";

function NavBar() {
    const {appUser}: AppContext = useGlobalContext()

    return (
        <nav className="navbar">
            <div className={"navbar-header"}>
            <p>{appUser?.name} </p>
                <img className={"navbar-logo"} alt={"profile-picture"} src={appUser?.avatar} />
            </div>
        </nav>
    );
}

export default NavBar;