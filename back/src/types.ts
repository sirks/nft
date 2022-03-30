export type BaseEntity = { _id?: string, ts?: number }
export type AccessEntity = BaseEntity & { event: string, token: string, address?: string, processing?: boolean, img?: string, transactionHash?: string, entrances?: string[], tokenId?: number }
export type Metadata = { name: string, description: string, image: string }

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
export type BaseRestResp = HttpOk | HttpError;
