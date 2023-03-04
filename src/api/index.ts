import hyRequest from "@/service";

type Result = {
    data:any,
    message:string,
    code:number
}
export const userLoginForname = (data:any) => hyRequest.post<Result>({
    url:'/audit/member/user/userLogin',
    data
})

export const userRegister = (data:any) => hyRequest.post<Result>({
    url:'/audit/member/user/createUser',
    data
})