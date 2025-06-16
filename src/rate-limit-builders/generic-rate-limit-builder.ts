export class GenericRateLimitBuilder<ReqType, ResType> {
  handle: (ReqType) => Promise<ResType>;
  constructor(
    action: (req: ReqType) => Promise<ResType>,
    private builderOptions: GenericRateLmitBuilderOptions
  ) {
    const ratelimiter = new BaseRateLimiter(action);
    this.handle = ratelimiter.handle;
  }

  useSlidingWindowRateLimiter(options: SlidingWindowRateLimiterOptions): this {
    const stategy = new PostSlidingWindowRateLimiterStategy(options);
    const limiterOptions: GenericRateLimiterOptions = options;
    if (!options.getKey) {
      limiterOptions.getKey = this.builderOptions.getKey;
    }
    const ratelimiter = new GenericRateLimiter(this.handle, {
      rateLimitStretegy: stategy,
      limiterOptions,
    });
    this.handle = ratelimiter.handle;
  }

  build(): (ReqType) => Promise<ResType> {
    return this.handle;
  }
}

export interface SlidingWindowRateLimiterOptions
  extends PostSlidingWindowRateLimiterOptions {
  timeFrameInMin: number;
  getKey: (req: ReqType) => string | undefined;
  getKeyAtOutPut: (req: ReqType, res: ResType) => string | undefined;
}

export interface GenericRateLmitBuilderOptions {
  getKey: (req: ReqType) => string;
  getKeyAtOutPut: (req: ReqType, res: ResType) => string | undefined;
}
