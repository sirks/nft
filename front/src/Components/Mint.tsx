import React, {FC, useEffect, useState} from "react";
import {getMinted, mint} from "../utils";
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
    setTokenId: (value: string | ((prevVar: string) => string)) => void,
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
                                 setTokenId,
}) => {
    const [isMinted, setIsMinted] = useState<boolean>(false);

    useEffect(() => {
        const isMinted = async () => {
            try {
                setMinting(true);
                const mintResult = await getMinted(MINT_EVENT, path);
                console.log(mintResult);
                if (mintResult.data === false) {
                    console.log('is not minted');
                    setMinting(false);
                    return;
                }
                if (mintResult.data) {
                    setIsMinted(true);
                    const mintResult = await getMinted(MINT_EVENT, path);
                    if (mintResult.err) {
                        // setErr('Cant generate ticket');
                        // setMinting(false);
                        return;
                    }
                    setErr('');
                    setMinting(false);
                    console.log(mintResult.data);
                    setLastMint(mintResult.data.img);
                    setTokenId(mintResult.data.tokenId);
                }
            } catch (e) {
                setErr('Something went wrong');
                setMinting(false);
            }
        }
        isMinted().then();
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
            {!lastMintUrl && <MintInput minting={minting} address={address} pathParam={path} onMint={onMint} isMinted={isMinted} />}

            {err &&
                <div className="mt-6">
                    <Alert color={'red'} title={'Error'} description={err} />
                </div>
            }

        </div>
    );
}

export default Mint;
