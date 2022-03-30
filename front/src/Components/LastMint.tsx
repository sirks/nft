import React, {FC, useEffect, useRef} from 'react';
import {useOnLoadImages} from "../useOnLoadImages";
import QRCode from "react-qr-code";
import Loading from "./Loading";
import {BaseProps} from "../Types/types";
import {OPENSEA_ASSETS} from "../environment";

type LastMintProps = {
    url: string;
    name: string;
    signature: string,
    resetSign: () => void,
    tokenId: string,
} & BaseProps;

const LastMint: FC<LastMintProps> = ({ url, name, signature, tokenId }) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const {status: imageLoaded, loadImages} = useOnLoadImages(wrapperRef);

    useEffect(() => {
        loadImages();
    }, []);

    let showQR = false;
    if (signature) {
        showQR = true;
    }

    return (
                <div ref={wrapperRef} className="flex justify-center">
                    {!imageLoaded &&
                        <div className="w-[256px] h-[256px] flex justify-center items-center pt-[40px] mx-auto mt-6">
                            <Loading />
                        </div>
                    }
                    {!showQR &&
                        <img
                            title={name}
                            alt={name}
                            className={`${!imageLoaded ? 'hidden' : ''} ${tokenId ? 'cursor-pointer' : ''} flex-shrink-0 w-[256px] h-[256px] object-cover object-center mx-auto mt-6`}
                            src={url}
                            onClick={e => tokenId && window.open(OPENSEA_ASSETS + tokenId, "_blank")}
                        />
                    }
                    {signature && showQR &&
                        <QRCode className="mt-6" value={signature} level="H" size={256} />
                    }
                </div>
    );
};

export default LastMint;
