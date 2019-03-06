export interface admin {
    user?: string;
    password?: number;
}
export interface commentreport {
    idUser?: number;
    idUserComment?: number;
    collectComment?: string;
    name?: string;
    penname?: string;
    avatar?: string;
}
export interface likeday {
    nameFiction?: string;
    viewOfTheDay?: number;
    viewOfTheMonth?: number;
    viewOfTheYear?: number;
    count?: any;
}
export interface likemonth {
    nameFiction?: string;
    viewOfTheMonth?: number;
    viewOfTheYear?: number;
    count?: any;
}
export interface likeyear {
    nameFiction?: string;
    viewOfTheYear?: number;
    count?: any;
}
export interface commentday {
    nameFiction?: string;
    commentDay?: number;
    commentMonth?: number;
    commentYear?: number;
    count?: any;
}
export interface commentmonth {
    nameFiction?: string;
    commentMonth?: number;
    commentYear?: number;
    count?: any;
}
export interface commentyear {
    nameFiction?: string;
    commentYear?: number;
    count?: any;
}
export interface viewyear {
    nameFiction?: string;
    viewYear?: number;
    sum?: any;
}
export interface viewmonth {
    nameFiction?: string;
    viewMonth?: number;
    viewYear?: number;
    sum?: any;
}
export interface viewday {
    nameFiction?: string;
    viewDay?: number;
    viewMonth?: number;
    viewYear?: number;
    sum?: any;
}
export interface searchall {
    nameFiction?: string;
    type?: string;
    preview?: string;
    sum?: any;
    totalcomment?: any;
    totallike?: any;
}
export interface webboard1{
    idWebboard?:number;
    penName?:string;
    collectWebboard?:string;
    headderWebboard?:string;
}
export interface webboard2{
    idWebboard?:number;
    penName?:string;
    collectWebboard?:string;
    headderWebboard?:string;
}
export interface webboard3{
    idWebboard?:number;
    penName?:string;
    collectWebboard?:string;
    headderWebboard?:string;
}
export interface main{
    idUser?:number;
    idWebboard?:number;
    penName?:string;
    collectWebboard?:string;
    headderWebboard?:string;
    avatar?:string;
}
export interface comment{
    idUser?:number;
    idUserWebboard?:number;
    penName?:string;
    collectWebboard?:string;
    avatar?:string;
}
export interface adminwebboard{
    userName?:String;
    collectWebboard?:String;
    headderWebboard?:String;
    idAdminWebboard?:number;
}
export interface checkwebboard{
    penName?:String;
    name?:String;
    avatar?:String;
    collectUserWebboard?:String;
    idUserWebboard?:number;
}
export interface adminWebboard2{
    penName?:String;
    headderWebboard?:String;
    collectWebboard?:String;
    idWebboard?:number;
}