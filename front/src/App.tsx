import React from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Admin from "./Admin";
import Client from "./Client";
import {ethers} from "ethers";
import {CONTRACT_ADDRESS} from "./environment";
import {ABI} from "./Abi";


const App = () => {
    if (!window.ethereum) {
        window.location.href = `https://metamask.app.link/dapp/${window.location.host}`;
        return <></>
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider);
    provider.send("eth_requestAccounts", [])

    return (
        <BrowserRouter>
            <Routes>
                <Route path='/admin' element={<Admin provider={provider} contract={contract}/>}/>
                <Route path='' element={<Client provider={provider} contract={contract}/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
