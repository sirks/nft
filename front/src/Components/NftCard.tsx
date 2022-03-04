import React, {FC} from 'react';
import Signature from "./Signature";
import QRCode from "react-qr-code";

type NftCardProps = {
    name: string;
    src: string;
    id?: string;
    handleSign?: (e: React.MouseEvent<HTMLButtonElement>, id: string) => Promise<void>;
    resetSign?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    minted?: boolean;
    signature?: string;
}

const NftCard: FC<NftCardProps> = ({name, src, id, handleSign, minted, signature, resetSign}) => {
    const onImageCownload = () => {
        const svg = document.getElementById(id!);
        const svgData = new XMLSerializer().serializeToString(svg!);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.onload = () => {
            canvas.width = 800;
            canvas.height = 800;
            ctx?.drawImage(img, 0, 0, img.width * 4, img.height * 4);
            const pngFile = canvas.toDataURL("image/png");
            const downloadLink = document.createElement("a");
            downloadLink.download = "NFT_QRCode";
            downloadLink.href = `${pngFile}`;
            downloadLink.click();
        };
        img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    };

    let showQR: boolean = false;
    if (signature) {
        showQR = signature.split('|')[0] === id;
    }

    return (
        <div className={`p-4 ${!minted ? 'xl:w-1/2' : ''}`}>
            <div
                className="p-4 overflow-hidden border-2 border-orange h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                <div className="sm:mb-0 mb-4">
                    {!showQR &&
                        <img
                            title={name}
                            alt={name}
                            className="flex-shrink-0 w-[200px] h-[200px] object-cover object-center"
                            src={src}/>
                    }
                    {signature && showQR &&
                        <QRCode id={id} value={signature} level="H" size={200}/>
                    }
                </div>
                <div className="flex flex-col h-full justify-around flex-grow sm:pl-8">
                    <h3 className="text-black text-3xl mb-3">{name}</h3>
                    {!showQR && handleSign && id &&
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
                                onClick={onImageCownload}>
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
    );
};

export default NftCard;
