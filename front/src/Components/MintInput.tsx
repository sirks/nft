import React, {FC, MouseEvent} from 'react';

type MintInputProps = {
    address: string;
    pathParam: string;
    onMint: (address: string, hash: string) => Promise<void>;
    minting: boolean,
    isMinted: boolean,
}

const MintInput: FC<MintInputProps> = ({address, pathParam, onMint, minting, isMinted}) => {

    // const clickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    //     if (isMinted)
    //         getMinted(pathParam).then();
    //     else
    //         onMint(address, pathParam).then();
    // }
    return (
        <div className="pb-4 flex md:flex-nowrap flex-wrap justify-center items-end md:justify-start flex-col md:flex-row">
            <button
                className={`${minting ? 'cursor-not-allowed' : ''} flex mx-auto text-white bg-orange border-0 w-full w-auto justify-center py-4 px-14 focus:outline-none hover:text-black text-2xl sm:text-3xl font-black uppercase`}
                onClick={e => onMint(address, pathParam)}
                disabled={minting}
            >{minting ? 'Minting...' : 'Mint your NFT'}
            </button>
        </div>
    );
};

export default MintInput;
