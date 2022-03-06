import React, {FC, useEffect, useRef, useState} from "react";
import {getTokensOf, getTokenURI, ipfs2https, signMessage} from "../utils";
import {BaseProps, Nft} from "../Types/types";
import NftCard from "./NftCard";
import Alert from "./Alert";
import Loading from "./Loading";
import {useOnLoadImages} from "../useOnLoadImages";

type MyNftsProps = {
    address: string,
} & BaseProps

const MyNfts: FC<MyNftsProps> = ({provider, address}) => {
    const [nfts, setNfts] = useState<Nft[]>([]);
    const [signature, setSignature] = useState<string>("");
    const [error, setError] = useState<string>("waiting for signature");

    const wrapperRef = useRef<HTMLDivElement>(null);
    const {status: imagesLoaded, loadImages} = useOnLoadImages(wrapperRef);

    useEffect(() => {
        try {
            const reloadNfts = async () => {
                const tokenIds = await getTokensOf(address);
                let urls = await Promise.all(tokenIds.map(getImageUrl));
                if (!tokenIds.length || !urls.length) {
                    setError("Could not load");
                }
                setNfts(urls);
                loadImages();
            }
            setError("");
            setSignature("");
            setNfts([]);
            reloadNfts();
        } catch (e) {
            setError("Could not load");
        }

    }, [address]);

    const getImageUrl = async (id: string): Promise<Nft> => {
        const uri = await getTokenURI(id);
        const metadata: any = await fetch(ipfs2https(uri)).then(r => r.json());
        return {url: ipfs2https(metadata.image), id, name: metadata.name};
    }

    const handleSign = async (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
        const sig = await signMessage(provider, id);
        if (!sig) {
            setError("Could not sign");
            setSignature("");
            return;
        }
        setError("");
        setSignature(`${id}|${sig}`);
    };

    const resetSign = (e: React.MouseEvent<HTMLButtonElement>) => {
        setSignature('');
    }

    return (
        <>
            <section className="text-black body-font pt-20 pb-10">
                <div className="px-5 mx-auto" ref={wrapperRef}>
                    <div className="flex flex-col text-center w-full mb-10">
                        <h1 className="sm:text-6xl text-5xl mb-4 text-black tracking-widest">My NFT's</h1>
                    </div>
                    {!imagesLoaded &&
                        <Loading />
                    }
                    <div className={`${imagesLoaded ? '' : 'hidden'} flex flex-wrap flex-col xl:flex-row -m-4`}>
                        {nfts.map(nft =>
                            <NftCard
                                key={nft.id}
                                src={nft.url}
                                name={nft.name}
                                id={nft.id}
                                handleSign={handleSign}
                                resetSign={resetSign}
                                signature={signature}
                            />
                        )}
                    </div>
                </div>
            </section>
            {error && <Alert color={'red'} title={'Error'} description={error} />}
            {/*{signature &&*/}
            {/*    <Signature signature={signature}>*/}
            {/*        <QRCode id="QRCode" value={signature} level="H" size={200}/>*/}
            {/*    </Signature>*/}
            {/*}*/}
        </>
    );
}

export default MyNfts;
