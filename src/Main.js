import React, { useState } from "react";

import Main_Navbar from "./Main_Navbar";
import Dashboard from "./Dashboard.js"
import Quiz from './Quiz.js'
import Leaderboard from './Leaderboard.js'
import Profile from './Profile.js'

export default function Main({info, setInfo}){
    const [navState, setNavState] = useState("dashboard")
    const [qdata, setQdata] = useState([]);

    let content
    if (navState === 'dashboard'){
        content = <Dashboard info={info} qdata={qdata} setQdata={setQdata} />
    } else if (navState === 'quiz') {
        content = <Quiz info={info} qdata={qdata} setQdata={setQdata}/>
    } else if (navState === 'leaderboard') {
        content = <Leaderboard info={info}/>
    } else {
        content = <Profile info={info}/>
    }

    return(
        <div className="main_container">
            <div className="main_head"> <Main_Navbar navState={navState} setNavState={setNavState} info={info} setInfo={setInfo}/> </div>
            <div className="main_main"> {content} </div>
        </div>
    )
}