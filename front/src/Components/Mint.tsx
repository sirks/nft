import React, {FC, useEffect, useState} from "react";
import {checkTicket, getMinted, mint} from "../utils";
import {MINT_EVENT} from "../environment";
import {BaseProps, ERR, MintState, OK} from "../Types/types";
import MintInput from "./MintInput";
import Alert from "./Alert";
import InstallMetamask from "./InstallMetamask";
import Spinner from "./Spinner";
import TicketInput from "./TicketInput";

type MintProps = {
    address: string,
    path: string | null,
    err: string,
    setErr: (value: string | ((prevVar: string) => string)) => void,
    lastMintUrl: string,
    setLastMint: (value: string | ((prevVar: string) => string)) => void,
    setTokenId: (value: string | ((prevVar: string) => string)) => void,
    setAddress: (value: string | ((prevVar: string) => string)) => void,
} & BaseProps

const Mint: FC<MintProps> = ({
                                 address,
                                 path,
                                 err,
                                 setErr,
                                 lastMintUrl,
                                 setLastMint,
                                 setTokenId,
                                 provider,
                                 setAddress
}) => {
    const [mintState, setMintState] = useState<MintState>(MintState.IS_NOT_MINTED);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [ticketExists, setTicketExists] = useState<boolean>(false);

    useEffect(() => {
        const isMinted = async () => {
            try {
                if (!path) {
                    return;
                }
                setIsLoading(true);
                const mintResult = await getMinted(MINT_EVENT, path);
                console.log(mintResult);
                if (mintResult.data === false) {
                    setIsLoading(false);
                    return;
                }
                if (mintResult.err && mintResult.err.code === ERR.TOKEN_NOT_EXIST) {
                    setIsLoading(false);
                    setMintState(MintState.NO_SUCH_TOKEN);
                    setErr('Incorrect link');
                    return;
                }
                if (mintResult.err && mintResult.err.code === ERR.INCORRECT_DATA) {
                    setIsLoading(false);
                    setMintState(MintState.IS_MINTING);
                    return;
                }
                if (mintResult.data) {
                    setMintState(MintState.IS_MINTED);
                    setErr('');
                    setIsLoading(false);
                    setLastMint(mintResult.data.img);
                    setTokenId(mintResult.data.tokenId);
                }
            } catch (e) {
                setErr('Something went wrong');
                setIsLoading(false);
            }
        }
        isMinted().then();
    }, []);

    const onCheck = async (code: string) => {
        try {
            if (code === '') {
                setErr('Ticket ID is not specified');
                return;
            }
            setIsLoading(true);
            const checkResult = await checkTicket(code);
            if (checkResult.err) {
                let msg = "";
                switch (checkResult.err.code) {
                    case ERR.INCORRECT_DATA:
                        msg = "Incorect data";
                        break;
                    case ERR.TICKET_NOT_EXIST:
                        msg = "Ticket not exist";
                        break;
                    default:
                        //unknown error
                        msg = "Something went wrong";
                }
                setErr(msg);
                setIsLoading(false);
                setMintState(MintState.NO_SUCH_TOKEN);
                return;
            }
            if (checkResult.data && checkResult.data.code === OK.TICKET_EXISTS) {
                setErr('');
                setIsLoading(false);
                setTicketExists(true);
                setMintState(MintState.IS_MINTED);
            }
        } catch (e) {
            setErr('Something went wrong');
            setIsLoading(false);
        }
    }

    const onMint = async (address: string, hash: string) => {
        try {
            setIsLoading(true);
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
                    case ERR.TOKEN_NOT_EXIST:
                        msg = "No such ticket";
                        break;
                    default:
                        //unknown error
                        msg = "Thou shalt not mint";
                }
                setErr(msg);
                setIsLoading(false);
                return;
            }
            setErr('');
            setIsLoading(false);
            console.log(mintResult.data);
            setLastMint(mintResult.data.img);
        } catch (e) {
            setErr('Something went wrong');
            setIsLoading(false);
        }

    }

    const reset = () => {
        setErr('');
    }

    if (!window.ethereum && mintState === MintState.IS_NOT_MINTED && !isLoading) {
        const redirectUrl = "https://metamask.app.link/dapp/" + window.location.host + '/?code=' + path;
        return (
            <div className="mt-6">
                <InstallMetamask url={redirectUrl} />
            </div>
        );
    }

    if (window.ethereum) {
        window.ethereum.on('accountsChanged', (accounts: string[]) => {
            setAddress(accounts[0]);
        });
    }

    const showMintInput = !lastMintUrl && !isLoading && (mintState === MintState.IS_NOT_MINTED || mintState === MintState.IS_MINTING);

    return (
        <div className="mt-6">
            {isLoading && <Spinner/>}
            {showMintInput && path &&
                <MintInput provider={provider} isLoading={isLoading} address={address} pathParam={path} onMint={onMint} mintState={mintState}/>
            }
            {!ticketExists && !isLoading && <TicketInput provider={provider} isLoading={isLoading} address={address} mintState={mintState} onCheck={onCheck}/>}
            {err &&
                <div className="mt-6 flex justify-center">
                    <Alert color={'red'} title={'Error'} description={err} setState={reset}/>
                </div>
            }
        </div>
    );
}

export default Mint;
