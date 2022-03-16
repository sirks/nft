import React, {useState} from "react";
import {signMessage} from "./utils";
import {ethers} from "ethers";

export const useSignature = () => {
    const [signature, setSignature] = useState<string>("");
    const [error, setError] = useState<string>("waiting for signature");

    // const handleSign = async (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    //     const sig = await signMessage(provider, id);
    //     if (!sig) {
    //         setError("Could not sign");
    //         setSignature("");
    //         return;
    //     }
    //     setError("");
    //     setSignature(`${id}|${sig}`);
    // };

    const resetSign = () => {
        setSignature('');
    }

    return {
        signature,
        setSignature,
        error,
        setError,
        resetSign
    }
}
