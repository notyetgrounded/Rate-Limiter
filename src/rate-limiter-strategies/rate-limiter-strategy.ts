export interface RatelimitStretegy {
  isAllowed(key: string): promise<boolean>;
  onResponse(key: string): Promise<boolean>;
}
