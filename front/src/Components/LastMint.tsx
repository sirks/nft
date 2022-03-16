import React, {FC, useEffect, useRef} from 'react';
import {useOnLoadImages} from "../useOnLoadImages";
import QRCode from "react-qr-code";
import Loading from "./Loading";
import {BaseProps} from "../Types/types";

type LastMintProps = {
    url: string;
    name: string;
    signature: string,
    resetSign: () => void,
} & BaseProps;

const LastMint: FC<LastMintProps> = ({ url, name, provider, signature, resetSign}) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const {status: imageLoaded, loadImages} = useOnLoadImages(wrapperRef);

    useEffect(() => {
        loadImages();
    }, []);

    let showQR = false;
    if (signature) {
        showQR = true;
    }

    console.log(signature);
    return (
                <div ref={wrapperRef} className="mx-auto">
                    {!imageLoaded &&
                        <div className="w-[256px] h-[256px] flex justify-center items-center pt-[40px] mx-auto mt-6">
                            <Loading />
                        </div>
                    }
                    {!showQR &&
                        <img
                            title={name}
                            alt={name}
                            className={`${!imageLoaded ? 'hidden' : ''} flex-shrink-0 w-[256px] h-[256px] object-cover object-center mx-auto mt-6`}
                            src={url}
                            onClick={e => resetSign()}
                        />
                    }
                    {signature && showQR &&
                        <QRCode value={signature} level="H" size={256} onClick={e => resetSign()}/>
                    }
                </div>
    );
};

export default LastMint;
