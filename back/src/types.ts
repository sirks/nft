export type BaseEntity = { _id?: string, ts?: number }
export type AccessEntity = BaseEntity & { event: string, token: string, address?: string, processing?: boolean}

type HttpOk = { data: any }
type HttpError = { err: { msg: string, code: number } }
export type BaseRestResp = HttpOk | HttpError;

