import React, {FC, useEffect, useState} from 'react';
import MyNfts from "../Components/MyNfts";
import {BaseProps} from "../Types/types";
import {Link} from "react-router-dom";
import Mint from "../Components/Mint";


const Client: FC<BaseProps> = (props) => {
    const [address, setAddress] = useState<string>("");

    useEffect(() => {
        const initAccount = async () => {
            setAddress(await props.provider.getSigner().getAddress());
        }
        initAccount();
    }, []);

    props.provider.on('accountsChanged', (accounts: string[]) => {
        setAddress(accounts[0]);
    });

    return (
        <div>
            <Link to='admin'>goto admin</Link>
            <Mint address={address}/>
            {address && <MyNfts provider={props.provider} address={address}/>}
        </div>
    );
}

export default Client;
