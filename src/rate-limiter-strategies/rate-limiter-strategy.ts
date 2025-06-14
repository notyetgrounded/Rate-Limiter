export interface RatelimitStretegy{
    isAllowed(key:string):promise<boolean>
    addKey(key:string):Promise<boolean>
}