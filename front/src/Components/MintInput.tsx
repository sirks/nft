import React, {FC, useState} from 'react';

type MintInputProps = {
    address: string;
    pathParam: string;
    onMint: (address: string, hash: string) => Promise<void>;
}

const MintInput: FC<MintInputProps> = ({address, pathParam, onMint}) => {
    const [code, setCode] = useState<string>(pathParam);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value);
    }

    return (
        <div className="pb-4 flex md:flex-nowrap flex-wrap justify-center items-end md:justify-start flex-col md:flex-row">
            <div className="flex-1 relative w-full md:mr-4 mb-3 md:mb-0">
                <input
                    value={code}
                    onChange={handleInput}
                    type="text"
                    id="mint"
                    name="mint"
                    placeholder="Write your code here..."
                    className="w-full bg-gray-100 bg-opacity-50 border border-gray-300 focus:ring-2 focus:bg-transparent focus:ring-orange focus:border-orange text-base outline-none text-black py-4 px-3 leading-8 transition-colors duration-200 ease-in-out" />
            </div>
            <button
                className="flex mx-auto text-white bg-orange border-0 w-full md:w-auto justify-center py-4 sm:px-14 focus:outline-none hover:text-black text-2xl sm:text-3xl font-black uppercase"
                onClick={e => onMint(address, code)}
            >Mint your NFT
            </button>
        </div>
    );
};

export default MintInput;
