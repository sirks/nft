import React, {FC, useEffect} from "react";
import {checkIfMinted, mint} from "../utils";
import {MINT_EVENT} from "../environment";
import {BaseProps, ERR} from "../Types/types";
import MintInput from "./MintInput";
import Alert from "./Alert";

type MintProps = {
    address: string,
    path: string,
    minting: boolean,
    setMinting: (value: boolean | ((prevVar: boolean) => boolean)) => void,
    err: string,
    setErr: (value: string | ((prevVar: string) => string)) => void,
    lastMintUrl: string,
    setLastMint: (value: string | ((prevVar: string) => string)) => void,
} & BaseProps

const Mint: FC<MintProps> = ({
                                 address,
                                 path,
                                 minting,
                                 setMinting,
                                 err,
                                 setErr,
                                 lastMintUrl,
                                 setLastMint,
}) => {
    // const [minting, setMinting] = useState<boolean>(false);
    // const [err, setErr] = useState<string>("");
    // const [lastMintUrl, setLastMint] = useState<string>("");

    useEffect(() => {
        const isMinted = async () => {
            try {
                console.log('first render');
                const mintResult = await checkIfMinted(MINT_EVENT, path, address);
                console.log(mintResult);
            } catch (e) {
                setErr('Something went wrong');
                setMinting(false);
            }
        }
        isMinted();
    }, []);

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
        <div className="mt-6">
            {!lastMintUrl && <MintInput minting={minting} address={address} pathParam={path} onMint={onMint}/>}
            {/*{minting*/}
            {/*    ? <div className="text-center uppercase">Minting ...</div>*/}
            {/*    : <></>*/}
            {/*}*/}
            {err &&
                <div className="mt-6">
                    <Alert color={'red'} title={'Error'} description={err} />
                </div>
            }

            {/*{lastMintUrl &&*/}
            {/*    <LastMint provider={provider} url={ipfs2https(lastMintUrl)} name={'Your NFT is on its way'} />*/}
            {/*}*/}

        </div>
    );
}

export default Mint;
