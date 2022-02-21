import React, {FC, useState} from "react";
import {ipfs2https, mint} from "../utils";
import {MINT_EVENT} from "../environment";
import {ERR} from "../Types/types";

type MintProps = {
    address: string,
}

const Mint: FC<MintProps> = ({address}) => {
    const [minting, setMinting] = useState<boolean>(false);
    const [err, setErr] = useState<string>("");
    const [lastMintUrl, setLastMint] = useState<string>("");

    const path = window.location.pathname.slice(1);
    if (!path) {
        return <></>
    }

    const onMint = async (address: string, hash: string) => {
        setMinting(true);
        const mintResult = await mint(MINT_EVENT, hash, address);
        debugger;
        let msg = "";
        if (mintResult.err) {
            switch (mintResult.err.code) {
                case ERR.INCORRECT_DATA:
                    msg = `could not mint: ${mintResult.err.msg}`;
                    break;
                case ERR.TOKEN_USED:
                    msg = "ticket used";
                    break;
                case ERR.NO_SUCH_TOKEN:
                    msg = "no such ticket";
                    break;
                default:
                    //unknown error
                    msg = "thou shalt not mint";
            }
            setErr(msg);
            setMinting(false);
            return;
        }
        setMinting(false);
        setLastMint(mintResult.data.img);
    }
    return (
        <div>
            {lastMintUrl && <div>
                <div>Your nft is on its way</div>
                <img src={ipfs2https(lastMintUrl)} width={200} height={200}/>
            </div>}
            {minting
                ? <div>Minting ...</div>
                : <button style={{backgroundColor: "green"}} onClick={e => onMint(address, path)}>MINT MY NFT</button>
            }
            {err && <div color={"red"}>Error: {err}</div>}
        </div>
    );
}

export default Mint;
