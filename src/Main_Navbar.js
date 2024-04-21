import React, { useState } from "react";
import './Main_Navbar.css';

export default function Main_Navbar({navState, setNavState, info, setInfo}) {
    const [menuActive, setMenuActive] = useState(false);

    const toggleMenu = () => {
        setMenuActive(prev => !prev);
    };
    
    return (
        <div>
            <div className="navbar">
                <div className="menu-bars" onClick={toggleMenu}>☰</div>
                <div>
                    <input
                        type="text"
                        placeholder="Search here"
                        className="search-input"
                    />
                    <i className="fa-solid fa-magnifying-glass search-icon"></i>
                </div>
                <div 
                    className='logout'
                ><div>Welcome {info.name} &nbsp; &nbsp;</div>
                <i className="fa-solid fa-arrow-right-from-bracket" onClick={() => setInfo(false)}></i>
                </div>
            </div>

            

            <div className="main">
                <div className={`nav-menu ${menuActive ? 'active' : ''}`} id="navMenu">
                    <ul className="nav-menu-items">
                        <li className="nav-text" onClick={() => setNavState("dashboard")}>Dashboard</li>
                        {/* <li className="nav-text" onClick={() => setNavState("leaderboard")}>Leaderboard</li> */}
                        <li className="nav-text" onClick={() => setNavState("quiz")}>Quiz</li>
                        <li className="nav-text" onClick={() => setNavState("profile")}>Profile</li>
                    </ul>
                </div>
            </div>
        </div >
    );
}