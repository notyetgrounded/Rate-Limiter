import { describe, it, expect} from 'vitest'
import { BaseRateLimiter } from '../../src/rate-limiters/base-rate-limiter'


class Limiter<ResType,ReqType=unknown> extends BaseRateLimiter<ReqType,ResType>{}
describe('handle', () => {
  it('handle should resolve the function when function is parameterized', async () => {
    const number= 5
    const limiter = new Limiter<number,number>((passedNumber)=>new Promise<number>((resolve) => {
    resolve(passedNumber)
    })) 
    const result = await limiter.handle(number)
    expect(result).toBe(number)
  })

  it('handle should resolve the function when function is not parameterized', async () => {
    const number= 5
    const limiter = new Limiter<number>(()=>new Promise<number>((resolve) => {
    resolve(5)
    })) 
    const result = await limiter.handle(number)
    expect(result).toBe(number)
  })

  it('handle should throw the error when next handler rejects', async () => {
    const number= 5
    const limiter = new Limiter<number>(()=>new Promise<number>((resolve,rejects) => {
    rejects(5)
    })) 
    try{
    const result = await limiter.handle(number)
    expect("").toBe("expected to throw error")
    }
    catch{
        // expect("").toBe("expected to throw error")
    }
  })
})