import { describe, it, expect} from 'vitest'
describe('useSlidingWindowRateLimiter', () => {
  it('useSlidingWindowRateLimiter should resolve the function when request with in the limit', async () => {
    const number= 5
    const genericRateLimiterOptions:GenericRateLmitBuilderOptions = {getKey:(req:number)=>req.toString()}
    const limiter = new GenericRateLimitBuilder<number,number>((passedNumber)=>new Promise<number>((resolve) => {
    resolve(passedNumber)
    }),genericRateLimiterOptions) 
    limiter.useSlidingWindowRateLimiter({timeFrameInMin:1})

    const handler = limiter.build()
    const result = await handler(number)
    expect(result).toBe(number)
  })

  
})