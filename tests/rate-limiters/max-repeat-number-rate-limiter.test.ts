import { describe, it, expect} from 'vitest'
import { MaxRepeatNumberRateLimiter } from '../../src/rate-limiters/max-repeat-number-rate-limiter'
import { LimiterError } from '../../src/error/limiter-error'


describe('handle', () => {
  it('handle should resolve the function when req is with the limit', async () => {
    const number= 5
    const limiter = new MaxRepeatNumberRateLimiter<number>((passedNumber)=>new Promise<number>((resolve) => {
    resolve(passedNumber)
    }),{limit:1}) 
    const result = await limiter.handle(number)
    expect(result).toBe(number)
  })

    it('handle should throw error when req exceeds the limit', async () => {
    const number= 5
    const limiter = new MaxRepeatNumberRateLimiter<number>((passedNumber)=>new Promise<number>((resolve) => {
    resolve(passedNumber)
    }),{limit:1}) 
    const result = await limiter.handle(number)
    try{
    const result = await limiter.handle(number)
    expect("").toBe("expected to throw error")
    }
    catch(err){
        if (!(err instanceof LimiterError))
            expect("").toBe("expected to throw error")
        // expect("").toBe("expected to throw error")
    }
  })

  
})