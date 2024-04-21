import React, { useState } from 'react';

import Navbar from "./Navbar.js"
import Login from "./Login.js"
import Register from "./Register.js"
import AboutUs from "./AboutUs.js"
import Hero from "./Hero.js"

export default function Home({info, setInfo}) {
    const [navState, setNavState] = useState("login");
    
    let content
    if (navState === "register"){
        content = <Register />
    } else if (navState === 'login') {
        content = <Login login={setInfo}/>
    } else if (navState === 'about'){
        content = <AboutUs/>
    } else {
        content = <Hero/>
    }

    return(
        <div className='home_container'>
            <Navbar navState={navState} setNavState={setNavState} />
            {content}
        </div>
    );
}