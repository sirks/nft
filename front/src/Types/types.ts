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
    NO_SUCH_TOKEN = -2,
    TOKEN_USED = -3,
    TOKEN_STOLEN = -4,
    TOKEN_NOT_MINTED = -5,
    TOKEN_SCANNED = -6,
}

export enum OK {
    NEW_VISIT = 1,
    RETURNING_VISIT = 2
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
