import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Admin from "./Pages/Admin";
import Client from "./Pages/Client";
import {ethers} from "ethers";
import Welcome from "./Components/Welcome";
import InstallNow from "./Components/InstallNow";
import detectEthereumProvider from "@metamask/detect-provider";


const App = () => {
    if (!window.ethereum) {
        window.location.href = `https://metamask.app.link/dapp/${window.location.host}`;
        // return (
        //     <div className="bg-white text-black text-4xl container">
        //         <Welcome />
        //         <InstallNow />
        //     </div>
        // );
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider.send("eth_requestAccounts", []).then();
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/admin' element={<Admin provider={provider}/>}/>
                <Route path='*' element={<Client provider={provider}/>}/>
                <Route path='/:mintId' element={<Client provider={provider}/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
