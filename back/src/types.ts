export type BaseEntity = { id: string, ts: number }
export type AccessEntity = BaseEntity & { event: string, token: string, address?: string }

type HttpOk = { data: any }
type HttpError = { err: { msg: string, code: number } }
export type BaseRestResp = HttpOk | HttpError;

