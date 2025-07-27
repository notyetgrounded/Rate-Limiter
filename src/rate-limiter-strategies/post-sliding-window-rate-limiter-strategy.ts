export class PostSlidingWindowRateLimiterStategy implements RatelimitStretegy {
  limitWindow: Map<string, Date>;
  constructor(private options: PostSlidingWindowRateLimiterOptions) {
    this.limitWindow = new Map<string, Date>();
  }
  isAllowed(key: string): promise<boolean> {
    if (this.limitWindow.has(key) && this.inRange(this.limitWindow.get(key)))
      return true;
    return false;
  }
  onResponse(key: string): Promise<boolean> {
    this.limitWindow.set(key, new Date());
  }

  inRange(sourceDate: Date): boolean {
    const now = Date();
    const diff = sourceDate - now;
    if (diff / (1000 * 60) < this.options.timeFrameInMin) return true;
    return false;
  }
}

export interface PostSlidingWindowRateLimiterOptions {
  timeFrameInMin: number;
}
