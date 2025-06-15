export class GenericRateLimitBuilder<ReqType, ResType> {
  handle: (ReqType) => Promise<ResType>;
  constructor(
    action: (req: ReqType) => Promise<ResType>,
    options: GenericRateLmitBuilderOptions
  ) {
    const ratelimiter = new BaseRateLimiter(action);
    this.handle = ratelimiter.handle;
  }

  useSlidingWindowRateLimiter(options:SlidingWindowRateLimiterOptions) {
    const stategy = new PostSlidingWindowRateLimiterStategy(options)
    const ratelimiter =  new GenericRateLimiter()
  }
}

export interface SlidingWindowRateLimiterOptions extends PostSlidingWindowRateLimiterOptions{

}

export interface GenericRateLmitBuilderOptions {}
