export  interface RateLimiter<ReqType,ResType> {

    handle(req:ReqType):Promise<ResType>
}