import React, {useState} from 'react';

import {ethers} from "ethers";

const signMessage = async (message: string) => {
    try {
        console.log({message});
        if (!window.ethereum)
            throw new Error("No crypto wallet found. Please install it.");

        await window.ethereum.send("eth_requestAccounts");
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const signature = await signer.signMessage(message);
        const address = await signer.getAddress();

        return signature;
    } catch (err) {
        console.log("could not sign message");
    }
};

const verifyMessage = (msg: string, signature: string) => {
    try {
        return ethers.utils.verifyMessage(msg, signature);
    } catch (err) {
        console.log(err);
    }
};

export default function SignMessage() {
    const ogMessage = "how did i get here";
    const [signature, setSignature] = useState("waiting for signature");
    const [signerAddress, setSignerAddress] = useState("waiting for signature");
    const handleSign = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const sig = await signMessage(ogMessage);
        if (!sig) {
            return;
        }
        const ver = verifyMessage(ogMessage, sig);
        if (!ver) {
            return;
        }
        setSignature(sig);
        setSignerAddress(ver);
    };

    return (
        <div>
            <button onClick={handleSign}>sign</button>
            <div>{ogMessage}</div>
            <div>{signature}</div>
            <div>{signerAddress}</div>
        </div>

    );
}