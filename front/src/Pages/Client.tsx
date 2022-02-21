import React, {FC, useEffect, useState} from 'react';
import MyNfts from "../Components/MyNfts";
import {BaseProps} from "../Types/types";
import {Link} from "react-router-dom";
import Mint from "../Components/Mint";
import Welcome from "../Components/Welcome";


const Client: FC<BaseProps> = ({provider}) => {
    const [address, setAddress] = useState<string>("");

    useEffect(() => {
        const initAccount = async () => {
            setAddress(await provider.getSigner().getAddress());
        }
        initAccount();
    }, []);

    provider.on('accountsChanged', (accounts: string[]) => {
        setAddress(accounts[0]);
    });

    return (
        <div className="bg-white text-2xl text-black text-4xl container">
            <Welcome metamaskInstalled={true} />
            <Link to='admin'>goto admin</Link>
            <Mint address={address}/>
            {address && <MyNfts provider={provider} address={address}/>}
        </div>
    );
}

export default Client;
