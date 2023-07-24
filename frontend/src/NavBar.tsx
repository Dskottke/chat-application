import React from 'react';
import {useGlobalContext} from "./Context";
import {AppContext, AppUser} from "./models";
type Props = {
 appUser: AppUser

}
function NavBar(props:Props) {

    return (
        <nav className="navbar">
            <div className={"navbar-header"}>
            <p>{props.appUser?.name} </p>
                <img className={"navbar-logo"} alt={"profile-picture"} src={props.appUser?.avatar} />
            </div>
        </nav>
    );
}

export default NavBar;