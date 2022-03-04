import React, {FC, useEffect, useState} from 'react';
import MyNfts from "../Components/MyNfts";
import {BaseProps} from "../Types/types";
import {Link} from "react-router-dom";
import Mint from "../Components/Mint";
import Welcome from "../Components/Welcome";
import UnlockAccount from "../Components/UnlockAccount";


const Client: FC<BaseProps> = ({provider}) => {
    const [address, setAddress] = useState<string>("");

    useEffect(() => {
        const initAccount = async () => {
            setAddress(await provider.getSigner().getAddress());
        }
        initAccount();
    }, []);

    window.ethereum.on('accountsChanged', (accounts: string[]) => {
        // debugger
        setAddress(accounts[0]);
    });

    const isLoggedIn = !!address;

    return (
        <div className="bg-white text-black text-4xl container px-4">
            {/*{!isLoggedIn && <Welcome metamaskInstalled={true}/>}*/}
            {!isLoggedIn &&
                <>
                    <Welcome metamaskInstalled={true}/>
                    <UnlockAccount />
                </>
            }
            {/*<Link to='admin'>goto admin</Link>*/}
            {isLoggedIn && <Mint address={address}/>}
            {address && <MyNfts provider={provider} address={address}/>}
        </div>
    );
}

export default Client;
