export type Page = {
    pageNo:number,
    pageSize:number,
    total:number
}
export interface Goods {
    brandId: string
    catalogId: string
    createTime: any
    goodsId: string
    number: number
    price: number
    publishStatus: string
    spuDescription: string
    spuImgName: string
    spuImgUrl: string
    spuName: string
    updateTime: any
    weight: any
    projectAttachList:any[]
}