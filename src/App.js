import React, { useState } from 'react';
import Home from "./Home.js"
import Main from './Main.js'

import Dashboard from './Dashboard'

function App() {
    const [info, setInfo] = useState(false)

    let content
    if (info){
        content = <Main info={info} setInfo={setInfo}/>
    } else {
        content = <Home info={info} setInfo={setInfo}/>
    }

    return (
        <div className='app_container'>
            {content}
        </div>
    );
}

export default App;
