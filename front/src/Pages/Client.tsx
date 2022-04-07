import React, {useEffect, useState} from 'react';
import Mint from "../Components/Mint";
import Welcome from "../Components/Welcome";
import Info from "../Components/Info";
import {useSearchParams} from "react-router-dom";
import {useSignature} from "../useSignature";
import {ethers} from "ethers";


const Client = () => {
    const [address, setAddress] = useState<string>("");

    const [err, setErr] = useState<string>("");
    const [lastMintUrl, setLastMint] = useState<string>("");
    const [tokenId, setTokenId] = useState<string>("");

    const {signature, setSignature, resetSign} = useSignature();

    useEffect(() => {
        const initAccount = async () => {
            setAddress(await provider.getSigner().getAddress());
        }
        initAccount();
    }, []);


    const [searchParams, setSearchParams] = useSearchParams();

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
    //
    // window.ethereum.on('accountsChanged', (accounts: string[]) => {
    //     setAddress(accounts[0]);
    // });
    //
    const provider = window.ethereum && new ethers.providers.Web3Provider(window.ethereum);

    const path = searchParams.get("code");

    return (
        <div className="text-black text-4xl container px-4">
            <Welcome setSignature={setSignature} signature={signature} resetSign={resetSign} lastMintUrl={lastMintUrl} tokenId={tokenId} path={path || ''} />
            {path &&
                <Mint
                    err={err}
                    setErr={setErr}
                    lastMintUrl={lastMintUrl}
                    setLastMint={setLastMint}
                    path={path}
                    provider={provider}
                    address={address}
                    setAddress={setAddress}
                    setTokenId={setTokenId}
                />
            }
            <Info />
        </div>
    );
}

export default Client;
