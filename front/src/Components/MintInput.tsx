import React, {FC} from 'react';
import UnlockAccount from "./UnlockAccount";
import {BaseProps, MintState} from "../Types/types";

type MintInputProps = {
    address: string;
    pathParam: string;
    onMint: (address: string, hash: string) => Promise<void>;
    isLoading: boolean,
    mintState: MintState
} & BaseProps

const MintInput: FC<MintInputProps> = ({address, pathParam, onMint, isLoading, provider, mintState}) => {

    if (!address && mintState === MintState.IS_NOT_MINTED) {
        return (
            <>
                {window.ethereum && <UnlockAccount provider={provider}/>}
            </>
        )
    }

    const stateForBtn = mintState === MintState.IS_MINTING;

    const text = mintState === MintState.IS_MINTING ? 'Minting...' : 'Mint your NFT';

    return (
        <div className="pb-4 flex md:flex-nowrap flex-wrap justify-center items-end md:justify-start flex-col md:flex-row">
            <button
                className={`${stateForBtn ? 'cursor-not-allowed' : ''} flex mx-auto text-white bg-orange border-0 w-full w-auto justify-center py-4 px-14 focus:outline-none hover:text-black text-2xl sm:text-3xl font-black uppercase`}
                onClick={e => onMint(address, pathParam)}
                disabled={stateForBtn}
            >{text}
            </button>
        </div>
    );
};

export default MintInput;
