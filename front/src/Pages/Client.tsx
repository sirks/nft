import React, {useEffect, useState} from 'react';
import Mint from "../Components/Mint";
import Welcome from "../Components/Welcome";
import Info from "../Components/Info";
import {useSignature} from "../useSignature";
import CtxProvider from "../Components/Context";
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

    const provider = window.ethereum && new ethers.providers.Web3Provider(window.ethereum);

    return (
        <CtxProvider>
            <div className="text-black text-4xl container px-4">
                <Welcome setSignature={setSignature} signature={signature} resetSign={resetSign} lastMintUrl={lastMintUrl} tokenId={tokenId} />
                <Mint
                    err={err}
                    setErr={setErr}
                    lastMintUrl={lastMintUrl}
                    setLastMint={setLastMint}
                    provider={provider}
                    address={address}
                    setAddress={setAddress}
                    setTokenId={setTokenId}
                />
                <Info />
            </div>
        </CtxProvider>
    );
}

export default Client;
