import React, {FC} from 'react';
import {BaseProps} from "../Types/types";
import MetamaskIcon from "../Assets/MetamaskIcon";

const UnlockAccount: FC<BaseProps> = ({provider}) => {
    return (
        <div
            className="mt-6 pb-4 flex md:flex-nowrap flex-wrap justify-center items-end md:justify-start flex-col md:flex-row">
            <button
                className="flex items-center mx-auto text-white bg-orange border-0 w-full w-auto justify-center py-4 px-14 focus:outline-none hover:text-black text-xl sm:text-3xl font-black uppercase"
                onClick={e => provider.send("eth_requestAccounts", []).then()}
            >
                <MetamaskIcon/>
                Connect Wallet
            </button>
        </div>
    );
};

export default UnlockAccount;
