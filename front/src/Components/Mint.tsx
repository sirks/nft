import React, {FC, useState} from "react";
import {ipfs2https, mint} from "../utils";
import {MINT_EVENT} from "../environment";
import {ERR} from "../Types/types";
import MintInput from "./MintInput";
import Alert from "./Alert";
import LastMint from "./LastMint";
import {useParams} from "react-router-dom";

type MintProps = {
    address: string,
}

const Mint: FC<MintProps> = ({address}) => {
    const [minting, setMinting] = useState<boolean>(false);
    const [err, setErr] = useState<string>("");
    const [lastMintUrl, setLastMint] = useState<string>("");

    const {mintId: path} = useParams();

    // const path = window.location.pathname.slice(1);
    if (!path) {
        return <></>
    }

    const onMint = async (address: string, hash: string) => {
        try {
            setMinting(true);
            const mintResult = await mint(MINT_EVENT, hash, address);
            // debugger;
            let msg = "";
            if (mintResult.err) {
                switch (mintResult.err.code) {
                    case ERR.INCORRECT_DATA:
                        msg = `Could not mint: ${mintResult.err.msg}`;
                        break;
                    case ERR.TOKEN_USED:
                        msg = "Ticket used";
                        break;
                    case ERR.NO_SUCH_TOKEN:
                        msg = "No such ticket";
                        break;
                    default:
                        //unknown error
                        msg = "Thou shalt not mint";
                }
                setErr(msg);
                setMinting(false);
                return;
            }
            setErr('');
            setMinting(false);
            console.log(mintResult.data);
            setLastMint(mintResult.data.img);
        } catch (e) {
            setErr('Something went wrong');
            setMinting(false);
        }

    }
    return (
        <div className="pt-24">
            <MintInput address={address} pathParam={path} onMint={onMint} />
            {lastMintUrl &&
                // <div>
                //     <div>Your NFT is on its way</div>
                //     <img src={ipfs2https(lastMintUrl)} width={200} height={200}/>
                // </div>
                <LastMint url={ipfs2https(lastMintUrl)} name={'Your NFT is on its way'} />
            }

            {minting
                ? <div className="pb-4">Minting ...</div>
                : <></>
                // : <button style={{backgroundColor: "green"}} onClick={e => onMint(address, path)}>MINT MY NFT</button>
            }
            {err && <Alert color={'red'} title={'Error'} description={err} />}
        </div>
    );
}

export default Mint;
