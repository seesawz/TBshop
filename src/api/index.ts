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
//查询商品
export const selectGoodsInfoByUser = (data:any) => hyRequest.post<Result>({
    url:'/audit/project/goodsInfo/selectGoodsInfoByUser',
    data
})

//查询商品详情
export const selectSingleGoods = (id:string) => hyRequest.get<Result>({
    url:`/audit/project/goodsInfo/selectSingleGoods/${id}`,
})