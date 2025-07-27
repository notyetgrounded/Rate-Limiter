export class GenericRateLimiter<ReqType,ResType> implements RateLimiter<ReqType,ResType>{
    constructor(private nextHandler:(()=>Promise<ResType>) | ((req:ReqType)=>Promise<ResType> ) ,private options:GenericRateLimiterOptions) {
    }

    handle(req:ReqType){
        const key  = this.options.getKey(req);
        const isAllowed = this.options.rateLimitStretegy.isAllowed(key)
        if(isAllowed)
        {
            const res = await this.nextHandler(req)
            let limitKey=key
            if(this.options.getKeyAtOutPut){
                limitKey = this.options.getKeyAtOutPut(req,res)
            }
            this.options.rateLimitStretegy.onResponse(limitKey)
        }
        throw new LimiterError()
    }
}

export interface GenericRateLimiterOptions<ReqType,ResType>{
    rateLimitStretegy: RatelimitStretegy,
    getKey: (req:ReqType)=>string,
    getKeyAtOutPut: (req:ReqType,res:ResType)=>string | undefined
}