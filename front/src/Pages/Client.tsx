import React, {FC, useEffect, useState} from 'react';
import {BaseProps} from "../Types/types";
import Mint from "../Components/Mint";
import Welcome from "../Components/Welcome";
import UnlockAccount from "../Components/UnlockAccount";
import Info from "../Components/Info";
import {useParams} from "react-router-dom";
import {useSignature} from "../useSignature";


const Client: FC<BaseProps> = ({provider}) => {
    const [address, setAddress] = useState<string>("");

    const [minting, setMinting] = useState<boolean>(false);
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

    window.ethereum.on('accountsChanged', (accounts: string[]) => {
        setAddress(accounts[0]);
    });

    const {mintId: path} = useParams();

    const isLoggedIn = !!address;

    return (
        <div className="bg-white text-black text-4xl container px-4">
            <Welcome setSignature={setSignature} signature={signature} resetSign={resetSign} provider={provider} lastMintUrl={lastMintUrl} tokenId={tokenId} />
            {path && isLoggedIn &&
                <Mint
                    minting={minting}
                    setMinting={setMinting}
                    err={err}
                    setErr={setErr}
                    lastMintUrl={lastMintUrl}
                    setLastMint={setLastMint}
                    path={path}
                    provider={provider}
                    address={address}
                    setTokenId={setTokenId}
                />
            }
            {!address && <UnlockAccount provider={provider}/>}
            <Info />
        </div>
    );
}

export default Client;
