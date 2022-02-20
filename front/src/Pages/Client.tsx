import React, {useEffect, useState, FC} from 'react';
import MyNfts from "../Components/MyNfts";
import {BaseProps} from "../Types/types";
import {Link} from "react-router-dom";

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
        <div>
            <Link to='admin'>goto admin</Link>
            {address && <MyNfts provider={provider} address={address}/>}
        </div>
    );
}

export default Client;
