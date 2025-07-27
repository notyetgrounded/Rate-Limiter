import { LimiterError } from "../errors/limiter-error";
import { BaseRateLimiter } from "./base-rate-limiter";
import { RateLimiter } from "./rate-limiter.interface";

export class MaxRepeatNumberRateLimiter<ResType> extends BaseRateLimiter<number,ResType>{
    private counter: Map<number,number>;

    constructor( nextHandler:(()=>Promise<ResType>) | ((req:number)=>Promise<ResType> ),private options:MaxRepeatNumberRateLimiterOptions){
        super(nextHandler)
        this.counter= new Map()
    }

    handle(req: number): Promise<ResType> {
        const count = this.counter.get(req) ?? 0 
        if (count>=this.options.limit){
            throw new LimiterError()
        }
        this.counter.set(req,count+1)
        return super.handle(req)
    }

}

export interface MaxRepeatNumberRateLimiterOptions{
    limit:number;
}