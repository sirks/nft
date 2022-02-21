import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Admin from "./Pages/Admin";
import Client from "./Pages/Client";
import {ethers} from "ethers";
import Welcome from "./Components/Welcome";


const App = () => {
    if (!window.ethereum) {
        // window.location.href = `https://metamask.app.link/dapp/${window.location.host}`;
        return (
            <div className="bg-white text-2xl text-black text-4xl container">
                <Welcome metamaskInstalled={false} />
            </div>
        );
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.send("eth_requestAccounts", []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/admin' element={<Admin provider={provider}/>}/>
                <Route path='*' element={<Client provider={provider}/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
