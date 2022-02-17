import React from 'react';
import './App.css';
import SignMessage from "./SignMessage";

function App() {
    if (!window.ethereum){
        return (
            <div>install metamask chrome extension</div>
        )
    }
    return (
        <SignMessage/>
    );
}

export default App;
