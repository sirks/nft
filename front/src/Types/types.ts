import {ethers} from "ethers";

export type Resp = {
    ok: string,
    nok: any,
}

export type BaseProps = {
    provider: ethers.providers.Web3Provider
}

export enum ERR {
    INCORRECT_DATA = -1,
    TOKEN_NOT_EXIST = -2,
    TOKEN_USED = -3,
    TOKEN_STOLEN = -4,
    TOKEN_NOT_MINTED = -5,
    TOKEN_SCANNED = -6,
    TICKET_NOT_EXIST = -7,
    CODE_NOT_EXIST = -8,
    CODE_USED = -9,
}

export enum OK {
    NEW_VISIT = 1,
    RETURNING_VISIT = 2,
    TICKET_EXISTS = 3,
    EVENT_ALREADY_REGISTERED = 4,
    EVENT_REGISTERED = 5,
}

type HttpOk = { data: any }
type HttpError = { err: { msg: string, code: ERR } }
export type BaseRestResp = HttpOk & HttpError;


export type Nft = {
    name: string,
    url: string,
    id: string,
}

export enum MintState {
    NO_SUCH_TOKEN = -1,
    IS_NOT_MINTED = 0,
    IS_MINTED = 1,
    IS_MINTING = 2
}
