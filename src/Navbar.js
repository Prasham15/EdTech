import React from "react";
import "./Navbar.css"

export default function Navbar({ navState, setNavState }) {

    return (
        <div className="navbar_container">

            <div className="logo" onClick={() => {setNavState('hero')}}> EdTech </div>

            <div className="navbar_tabs">
                <div className="navbar_tab" onClick={() => {setNavState('about')}}>About</div>
                {/* <div className="navbar_tab" onClick={() => {setNavState('resources')}}>Resources</div> */}
                <div className="navbar_tab" onClick={() => {setNavState('login')}}>Login</div>
                <div className="navbar_tab" onClick={() => {setNavState('register')}}>Register</div>
            </div>

        </div>
    );
}