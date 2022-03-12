import React, {FC, useEffect, useRef} from 'react';
import {useOnLoadImages} from "../useOnLoadImages";
import QRCode from "react-qr-code";
import Loading from "./Loading";
import {useSignature} from "../useSignature";
import {BaseProps} from "../Types/types";
import {onImageDownload} from "../utils";

type LastMintProps = {
    url: string;
    name: string;
    id: string;
} & BaseProps;

const LastMint: FC<LastMintProps> = ({ url, name, provider, id}) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const {status: imageLoaded, loadImages} = useOnLoadImages(wrapperRef);
    const {signature, setSignature, error, setError, handleSign, resetSign} = useSignature(provider);

    useEffect(() => {
        loadImages();
    }, []);

    let showQR = false;
    if (signature) {
        showQR = signature.split('|')[0] === id;
    }

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
                                {!showQR &&
                                    <img
                                        title={name}
                                        alt={name}
                                        className={`${!imageLoaded ? 'hidden' : ''} flex-shrink-0 w-[200px] h-[200px] object-cover object-center`}
                                        src={url}
                                    />
                                }
                                {signature && showQR &&
                                    <QRCode id={id} value={signature} level="H" size={200}/>
                                }
                            </div>
                            <div className="flex flex-col h-full justify-around flex-grow sm:ml-4">
                                <h3 className="text-xl md:text-4xl text-center ">{name}</h3>
                                {imageLoaded && !showQR && handleSign && id &&
                                    <button
                                        className="mt-16 text-black text-center hover:text-white border-2 border-black hover:border-orange hover:bg-orange py-4 px-5 md:px-14 focus:outline-none hover:text-black text-sm font-machina uppercase"
                                        onClick={e => handleSign(e, id)}
                                    >generate ticket
                                    </button>
                                }
                                {signature && showQR && resetSign &&
                                    <div className="flex justify-center sm:justify-start">
                                        <button
                                            className="flex mr-4 mt-16 text-black hover:text-white border-2 border-black hover:border-orange hover:bg-orange py-4 px-5 focus:outline-none hover:text-black text-sm font-machina uppercase"
                                            onClick={onImageDownload.bind(null, id!)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                        </button>
                                        <button
                                            className="flex mt-16 justify-center items-center text-black hover:text-white border-2 border-black hover:border-orange hover:bg-orange py-4 px-5 focus:outline-none hover:text-black text-sm font-machina uppercase"
                                            onClick={resetSign}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LastMint;
