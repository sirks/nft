export type BaseEntity = { _id?: string, ts?: number }
export type AccessEntity =
    BaseEntity
    & { event: string, token: string, address?: string, processing?: boolean, img?: string, transactionHash?: string, entrances?: string[], tokenId?: number }
export type EventEntity = BaseEntity & { name: string, location: string, time: string }
export type CodeEntity = BaseEntity & { code: string, total: number, used: number, event: string }
export type Metadata = { name: string, description: string, image: string }

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
export type BaseRestResp = HttpOk | HttpError;
