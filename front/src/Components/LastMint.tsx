import React, {FC, useEffect, useRef, useState} from 'react';
import NftCard from "./NftCard";
import {useOnLoadImages} from "../useOnLoadImages";
import QRCode from "react-qr-code";
import Loading from "./Loading";

type LastMintProps = {
    url: string;
    name: string;
}

const LastMint: FC<LastMintProps> = ({ url, name}) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const {status: imageLoaded, loadImages} = useOnLoadImages(wrapperRef);

    useEffect(() => {
        loadImages();
    }, []);

    // const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <section className="text-black body-font pb-10">
            <div className="flex items-center flex-col px-5 mx-auto">
                <div className="flex flex-col text-center w-full mb-5 lg:mb-4 lg:ml-4">
                    <h1 className="text-4xl font-medium title-font mb-4 text-black">You successfully minted NFT</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Now you can use this minted NFT to get into TechChill</p>
                </div>
                <div className="flex flex-wrap flex-col xl:flex-row justify-center w-full" ref={wrapperRef}>
                    <div className="">
                        <div
                            className="p-4 overflow-hidden border-2 border-orange h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                            <div className="sm:mb-0 mb-4">
                                {!imageLoaded &&
                                    <div className="w-[200px] h-[200px] flex justify-center items-center pt-[40px]">
                                        <Loading />
                                    </div>
                                }
                                <img
                                    title={name}
                                    alt={name}
                                    className={`${!imageLoaded ? 'hidden' : ''} flex-shrink-0 w-[200px] h-[200px] object-cover object-center`}
                                    src={url}
                                />
                            </div>
                            <div className="flex flex-col h-full justify-around flex-grow sm:ml-4">
                                <h3 className="text-xl md:text-4xl text-center ">{name}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LastMint;
