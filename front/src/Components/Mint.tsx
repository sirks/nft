import React, {FC, useContext, useState} from "react";
import {checkTicket, mint} from "../utils";
import {BaseProps, ERR, MintState, OK} from "../Types/types";
import MintInput from "./MintInput";
import Alert from "./Alert";
import InstallMetamask from "./InstallMetamask";
import Spinner from "./Spinner";
import TicketInput from "./TicketInput";
import {TicketCtx} from "./Context";
import ApplyForEvent from "./ApplyForEvent";

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
    const [ticketInput, setTicketInput] = useState<string>('');
    const {ticketId, setTicketId} = useContext(TicketCtx);

    // useEffect(() => {
    //     const isMinted = async () => {
    //         try {
    //             if (!path) {
    //                 return;
    //             }
    //             setIsLoading(true);
    //             const mintResult = await getMinted(MINT_EVENT, path);
    //             console.log(mintResult);
    //             if (mintResult.data === false) {
    //                 setIsLoading(false);
    //                 return;
    //             }
    //             if (mintResult.err && mintResult.err.code === ERR.TICKET_NOT_EXIST) {
    //                 setIsLoading(false);
    //                 setMintState(MintState.NO_SUCH_TOKEN);
    //                 setErr('Incorrect link');
    //                 return;
    //             }
    //             if (mintResult.err && mintResult.err.code === ERR.INCORRECT_DATA) {
    //                 setIsLoading(false);
    //                 setMintState(MintState.IS_MINTING);
    //                 return;
    //             }
    //             if (mintResult.data) {
    //                 setMintState(MintState.IS_MINTED);
    //                 setErr('');
    //                 setIsLoading(false);
    //                 setLastMint(mintResult.data.img);
    //                 setTokenId(mintResult.data.tokenId);
    //             }
    //         } catch (e) {
    //             setErr('Something went wrong');
    //             setIsLoading(false);
    //         }
    //     }
    //     isMinted().then();
    // }, []);

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
                setTicketId('');
                setLastMint('');
                setTokenId('');
                setTicketExists(false);
                return;
            }
            if (checkResult.data && checkResult.data.code === OK.TICKET_EXISTS) {
                setErr('');
                setLastMint('');
                setTokenId('');
                setIsLoading(false);
                setTicketExists(true);
                setMintState(MintState.IS_NOT_MINTED);
            }
            if (checkResult.data && checkResult.data.code === OK.MINTED) {
                setErr('');
                setLastMint(checkResult.data.img);
                setTokenId(checkResult.data.tokenId);
                setIsLoading(false);
                setTicketExists(true);
                setMintState(MintState.IS_MINTED);
                setTicketId(ticketInput);
            }
        } catch (e) {
            setErr('Something went wrong');
            setIsLoading(false);
        }
    }

    const onMint = async (address: string) => {
        try {
            setIsLoading(true);
            const mintResult = await mint(ticketInput, address);
            // debugger;
            let msg = "";
            if (mintResult.err) {
                switch (mintResult.err.code) {
                    case ERR.INCORRECT_DATA:
                        msg = `Could not mint: ${mintResult.err.msg}`;
                        break;
                    case ERR.CODE_USED:
                        msg = "Ticket used";
                        break;
                    case ERR.TICKET_NOT_EXIST:
                        msg = "No such ticket";
                        break;
                    default:
                        //unknown error
                        msg = "Thou shalt not mint";
                }
                setErr(msg);
                setIsLoading(false);
                setTicketId('');
                return;
            }
            setErr('');
            setIsLoading(false);
            console.log(mintResult.data);
            setLastMint(mintResult.data.img);
            setTicketId(ticketInput);
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
            {ticketExists && showMintInput &&
                <MintInput provider={provider} isLoading={isLoading} address={address} onMint={onMint} mintState={mintState}/>
            }
            <TicketInput ticketInput={ticketInput} setTicketInput={setTicketInput} provider={provider} isLoading={isLoading} address={address} mintState={mintState} onCheck={onCheck}/>
            {err &&
                <div className="mt-6 flex justify-center">
                    <Alert color={'red'} title={'Error'} description={err} setState={reset}/>
                </div>
            }
            {ticketId && lastMintUrl && <ApplyForEvent ticketId={ticketId} isLoading={isLoading} setIsLoading={setIsLoading}/>}
        </div>
    );
}

export default Mint;
