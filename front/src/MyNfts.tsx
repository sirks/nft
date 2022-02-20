import React, {useEffect, useState} from "react";
import {BigNumber} from "ethers";
import {getTokensOf, getTokenURI, ipfs2https, signMessage} from "./utils";
import QRCode from "react-qr-code";
import {BaseProps} from "./types";
import {fetchJson} from "ethers/lib/utils";

type MyNftsProps = {
    address: string,
} & BaseProps

type Nft = {
    name: string,
    url: string,
    id: string,
}

export const MyNfts = (props: MyNftsProps) => {
    const [nfts, setNfts] = useState<Nft[]>([]);
    const [signature, setSignature] = useState<string>("");
    const [error, setError] = useState<string>("waiting for signature");


    const getImageUrl = async (id: string): Promise<Nft> => {
        const uri = await getTokenURI(id);
        const metadata: any = await fetchJson(ipfs2https(uri));
        return {url: ipfs2https(metadata.image), id, name: metadata.name};
    }

    useEffect(() => {
        const reloadNfts = async () => {
            const tokenIds = await getTokensOf(props.address);
            let urls = await Promise.all(tokenIds.map(getImageUrl));
            setNfts(urls);
        }
        setError("");
        setSignature("");
        setNfts([]);
        reloadNfts();
    }, [props.address]);

    const handleSign = async (e: React.MouseEvent<HTMLImageElement>, id: string) => {
        const sig = await signMessage(props.provider, id);
        if (!sig) {
            setError("Could not sign");
            setSignature("");
            return;
        }
        setError("")
        setSignature(`${id}|${sig}`);
    };

    return (
        <div>
            <div>My nfts:</div>
            {nfts.map(nft => <img
                key={nft.id}
                width={200}
                height={200}
                src={nft.url}
                alt={nft.name}
                title={nft.name}
                onClick={e => handleSign(e, nft.id)}
            />)}
            {error && <div>Error: {error}</div>}
            <div>Signature</div>
            {signature && <QRCode value={signature} level="H"/>}
        </div>
    )
}

