import { RateLimiter } from "./rate-limiter.interface"

export abstract class BaseRateLimiter<ReqType,ResType>  implements RateLimiter<ReqType,ResType>{
    constructor(private nextHandler:(()=>Promise<ResType>) | ((req:ReqType)=>Promise<ResType> ) ) {
        
    }

    handle(req:ReqType){
            return this.nextHandler(req)
    }

}