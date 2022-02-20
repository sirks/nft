import React, {FC, useEffect, useState} from "react";
import {getTokensOf, getTokenURI, ipfs2https, signMessage} from "../utils";
import QRCode from "react-qr-code";
import {BaseProps, Nft} from "../Types/types";
import {fetchJson} from "ethers/lib/utils";

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

    const handleSign = async (e: React.MouseEvent<HTMLImageElement>, id: string) => {
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
        <div>
            <div>My nfts:</div>
            {nfts.map(nft =>
                <img
                    key={nft.id}
                    width={200}
                    height={200}
                    src={nft.url}
                    alt={nft.name}
                    title={nft.name}
                    onClick={e => handleSign(e, nft.id)}
                />
            )}
            {error && <div>Error: {error}</div>}
            <div>Signature</div>
            {signature && <QRCode value={signature} level="H"/>}
        </div>
    );
}

export default MyNfts;
