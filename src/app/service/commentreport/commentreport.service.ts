import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { commentreport } from '../../model/admin/admin';

@Injectable({
  providedIn: 'root'
})
export class CommentreportService {
 private url="http://localhost:9999/user/";
  constructor(private http:HttpClient) { }

  CommentReport(callback){
    this.http.get(this.url+"usercomment").subscribe(data=>{
        console.log(data);
        return callback(data);
    })
  }

  CanCelBan(id:number,callback){
     this.http.put(this.url+"cancelban",id).subscribe(result=>{
       if(result){
        return callback(true);
       }else{
         return callback(false);
       }
     })
  }

  Banuser(userid:number,commentid:number,callback){
   let body = {idUser:userid,idUserComment:commentid}
    this.http.put(this.url+"banuser",body).subscribe(result=>{
      if(result){
        return callback(true);
       }else{
         return callback(false);
       }
    })
  }
}
