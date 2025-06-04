import { ILimiter } from "../limiters/Limiter.interface";
import { BaseRateLimiter, RateLimitedError } from "./base-rate-limiter";

export class RippleDamper extends BaseRateLimiter<string>{
    constructor(limiter:ILimiter<string>){
        super(limiter)
    }

    handler<ReturnType>(req: string, nextHandler: (req: string) => ReturnType): void | ReturnType;
    handler<ReturnType>(req: string, nextHandler: () => ReturnType): void | ReturnType;
    handler<ReturnType>(req: string, nextHandler: (req: string) => ReturnType | (() => ReturnType)): ReturnType | void {
        try{
        super.handler(req,nextHandler)
        }
        catch(error){
            if(!(error instanceof RateLimitedError))
                throw error;
        }

        
    }

}