import { ILimiter } from "../limiters/Limiter.interface";

export class BaseRateLimiter<ReqType>{
    constructor(private limiter: ILimiter<ReqType>){
    }

    handler<ReturnType>( req: ReqType, nextHandler: (req: ReqType) => ReturnType): ReturnType | void;

    handler<ReturnType>(req: ReqType, nextHandler: () => ReturnType ): ReturnType | void;

    handler<ReturnType>(req:ReqType,nextHandler: (req: ReqType) => ReturnType | (()=> ReturnType)): ReturnType | void  {

        if(this.limiter.isAllowed(req))
        {
            try{
            return (nextHandler as (req: ReqType) => ReturnType)(req)
            }
            catch{
                return (nextHandler as () => ReturnType)()
            }
        }
        throw new RateLimitedError()
    }
}

export class RateLimitedError extends Error{

} 