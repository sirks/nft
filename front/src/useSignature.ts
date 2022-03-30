import {useState} from "react";

export const useSignature = () => {
    const [signature, setSignature] = useState<string>("");
    const [error, setError] = useState<string>("waiting for signature");

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
