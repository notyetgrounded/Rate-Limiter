import { RateLimiter } from "./rate-limiter.interface"

export abstract class BaseRateLimiter<ReqType,ResType>  implements RateLimiter<ReqType,ResType>{
    constructor(private nextHandler:(()=>Promise<ResType>) | ((req:ReqType)=>Promise<ResType> ) ) {
        
    }

    handle(req:ReqType){
        if(this.nextHandler.length>0)
            return (this.nextHandler as ((req:ReqType)=>Promise<ResType> ))(req)
        return (this.nextHandler as (()=>Promise<ResType>))()
    }

}