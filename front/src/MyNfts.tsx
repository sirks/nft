import React, {useEffect, useState} from "react";
import {BigNumber} from "ethers";
import {ipfs2https, signMessage} from "./utils";
import QRCode from "react-qr-code";
import {BaseProps} from "./types";

type MyNftsProps = {
    address: string,
} & BaseProps

type Nft = {
    name: string,
    url: string,
    id: number,
}

export const MyNfts = (props: MyNftsProps) => {
    const [nfts, setNfts] = useState<Nft[]>([]);
    const [signature, setSignature] = useState<string>("");
    const [error, setError] = useState<string>("waiting for signature");


    const getImageUrl = async (tokenId: BigNumber): Promise<Nft> => {
        const id = tokenId.toNumber();
        const uri: string = await props.contract.tokenURI(id);
        const metadata: any = await fetch(ipfs2https(uri)).then(response => response.json());
        return {url: ipfs2https(metadata.image), id, name: metadata.name};
    }

    useEffect(() => {
        const reloadNfts = async () => {
            const tokenIds: BigNumber[] = await props.contract.tokensOf(props.address);
            let urls = await Promise.all(tokenIds.map(getImageUrl));
            setNfts(urls);
        }
        setError("");
        setSignature("");
        setNfts([]);
        reloadNfts();
    }, [props.address]);

    const handleSign = async (e: React.MouseEvent<HTMLImageElement>, id: number) => {
        const sig = await signMessage(props.provider, id.toString());
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
            {signature && <QRCode value={signature}/>}
        </div>
    )
}