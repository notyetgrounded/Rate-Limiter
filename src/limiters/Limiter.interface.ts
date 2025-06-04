export interface ILimiter<ReqType>{
     isAllowed(req:ReqType):boolean
}