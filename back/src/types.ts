export type BaseEntity = { _id?: string, ts?: number }
export type AccessEntity =
    BaseEntity
    & {ticketId: string, address?: string, img?: string, transactionHash?: string, entrances?: {[key:string]:boolean}, tokenId?: number }
export type EventEntity = BaseEntity & { name: string, location: string, time: string }
export type CodeEntity = BaseEntity & { code: string, total: number, used: number, event: string }
export type Metadata = { name: string, description: string, image: string }

export enum ERR {
    INCORRECT_DATA = -1,
    TICKET_NOT_EXIST = -2,
    TICKET_MINTED = -3,
    TOKEN_NOT_MINTED = -5,
    TICKET_SCANNED = -6,
    CODE_NOT_EXIST = -8,
    CODE_USED = -9,
    NOT_REGISTERED = -10,
}

export enum OK {
    NEW_VISIT = 1,
    MINTED = 2,
    TICKET_EXISTS = 3,
    EVENT_ALREADY_REGISTERED = 4,
    EVENT_REGISTERED = 5,
}

type HttpOk = { data: any }
type HttpError = { err: { msg: string, code: ERR } }
export type BaseRestResp = HttpOk | HttpError;
