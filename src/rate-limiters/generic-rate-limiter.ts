export class GenericRateLimiter<ReqType,ResType> extends BaseRateLimiter<ReqType,ResType>{
    constructor(private nextHandler:(()=>Promise<ResType>) | ((req:ReqType)=>Promise<ResType> ) ,private options:GenericRateLimiterOptions) {
        super(nextHandler)
    }

    handle(req:ReqType){
        const key  = this.options.getKey(req);
        const isAllowed = this.options.rateLimitStretegy.isAllowed(key)
        if(isAllowed)
        {
            const res = await this.nextHandler(req)
            
        }

    }

}

export interface GenericRateLimiterOptions<ReqType,ResType>{
    rateLimitStretegy: RatelimitStretegy,
    getKey: (ReqType)=>string,
    getKeyAtOutPut: (ReqType,ResType)=>string
}