import React, {FC, useEffect, useState} from "react";
import {getTokensOf, getTokenURI, ipfs2https, signMessage} from "../utils";
import QRCode from "react-qr-code";
import {BaseProps, Nft} from "../Types/types";
import NftCard from "./NftCard";
import Signature from "./Signature";
import Alert from "./Alert";

type MyNftsProps = {
    address: string,
} & BaseProps

const MyNfts: FC<MyNftsProps> = ({provider, address}) => {
    const [nfts, setNfts] = useState<Nft[]>([]);
    const [signature, setSignature] = useState<string>("");
    const [error, setError] = useState<string>("waiting for signature");

    useEffect(() => {
        const reloadNfts = async () => {
            const tokenIds = await getTokensOf(address);
            let urls = await Promise.all(tokenIds.map(getImageUrl));
            setNfts(urls);
        }
        setError("");
        setSignature("");
        setNfts([]);
        reloadNfts();
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

    return (
        <>
            <section className="text-black body-font pb-10">
                <div className="px-5 mx-auto">
                    <div className="flex flex-col text-center w-full mb-10">
                        <h1 className="text-4xl font-medium title-font mb-4 text-black tracking-widest">My NFT's</h1>
                        <p className="lg:w-2/3 mx-auto leading-relaxed text-base">This is the list of your NFT's. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, velit.</p>
                    </div>
                    <div className="flex flex-wrap flex-col xl:flex-row -m-4">
                        {nfts.map(nft =>
                            <NftCard
                                key={nft.id}
                                src={nft.url}
                                name={nft.name}
                                id={nft.id}
                                handleSign={handleSign}
                            />
                        )}
                    </div>
                </div>
            </section>
            {error && <Alert color={'red'} title={'Error'} description={error} />}
            {signature &&
                <Signature signature={signature}>
                    <QRCode value={signature} level="H"/>
                </Signature>
            }
        </>
    );
}

export default MyNfts;
