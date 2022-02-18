import React, {useEffect, useState} from 'react';
import './App.css';
import {MyNfts} from "./MyNfts";
import {BaseProps} from "./types";
import {Link} from "react-router-dom";

function Client(props:BaseProps) {
    const [address, setAddress] = useState<string>("");

    useEffect(() => {
        const initAccount = async () => {
            setAddress(await props.provider.getSigner().getAddress());
        }
        initAccount();
    }, [])

    props.provider.on('accountsChanged', (accounts: string[]) => {
        setAddress(accounts[0]);
    });

    return <div>
        <Link to='admin'>goto admin</Link>
        {address && <MyNfts {...props} address={address}/>}
        </div>
    ;
}

export default Client;
