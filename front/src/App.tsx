import React, {useEffect} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Admin from "./Pages/Admin";
import Client from "./Pages/Client";
import {GlobalDebug} from "./removeConsoles";


const App = () => {

    useEffect(() => {
        (process.env.NODE_ENV === "production" ||
            process.env.REACT_APP_ENV === "STAGING") &&
        GlobalDebug(false);
    }, []);

    // if (!window.ethereum) {
    //     const redirectUrl = "https://metamask.app.link/dapp/" + window.location.host + window.location.pathname;
    //     return (
    //         <div className="text-black text-4xl container px-4 ">
    //             <Welcome tokenId={''} signature={''} setSignature={() => {}} resetSign={() => {}} provider={null} lastMintUrl={''}/>
    //             <InstallMetamask url={redirectUrl} />
    //             <Info />
    //         </div>
    //     );
    // }

    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/admin' element={<Admin />}/>
                <Route path='/' element={<Client />}/>
                <Route path="*" element={<Navigate to="/"/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
