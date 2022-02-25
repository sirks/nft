import React, {FC} from 'react';
import NftCard from "./NftCard";

type LastMintProps = {
    url: string;
    name: string;
}

const LastMint: FC<LastMintProps> = ({ url, name}) => {
    return (
        <section className="text-black body-font pb-10">
            <div className="flex items-center flex-col lg:flex-row-reverse px-5 mx-auto">
                <div className="flex flex-col text-center w-full mb-5 lg:mb-0 lg:ml-4">
                    <h1 className="text-4xl font-medium title-font mb-4 text-black">You successfully minted NFT</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Now you can use this minted NFT to get into TechChill</p>
                </div>
                <div className="flex flex-wrap flex-col xl:flex-row -m-4 w-full">
                    <NftCard
                        src={url}
                        name={name}
                        minted={true}
                    />
                </div>
            </div>
        </section>
    );
};

export default LastMint;
