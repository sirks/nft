export type BaseEntity = { _id?: string, ts?: number }
export type AccessEntity = BaseEntity & { event: string, token: string, address?: string, processing?: boolean }

export enum ERR {
    INCORRECT_DATA = -1,
    NO_SUCH_TOKEN = -2,
    TOKEN_USED = -3,
    TOKEN_STOLEN = -4,
}

export enum OK {
    NEW_VISIT = 1,
    RETURNING_VISIT = 2
}

type HttpOk = { data: any }
type HttpError = { err: { msg: string, code: ERR } }
export type BaseRestResp = HttpOk | HttpError;
