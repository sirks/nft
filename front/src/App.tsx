import React from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Admin from "./Pages/Admin";
import Client from "./Pages/Client";
import {ethers} from "ethers";
import Welcome from "./Components/Welcome";
import InstallMetamask from "./Components/InstallMetamask";
import Info from "./Components/Info";


const App = () => {

    if (!window.ethereum) {
        let redirectUrl = "https://metamask.app.link/dapp/" + window.location.host + window.location.pathname;
        return (
            <div className="bg-white text-black text-4xl container px-4">
                <Welcome signature={''} setSignature={() => {}} resetSign={() => {}} provider={null} lastMintUrl={''}/>
                <InstallMetamask url={redirectUrl} />
                <Info />
            </div>
        );
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    
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
