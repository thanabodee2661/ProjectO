import { Component, OnInit } from '@angular/core';
import { WebboardService } from '../../service/webboard/webboard.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-createwebboard',
  templateUrl: './createwebboard.component.html',
  styleUrls: ['./createwebboard.component.css']
})
export class CreatewebboardComponent implements OnInit {
  type:number=0;
  constructor(private webservice: WebboardService,private router:Router) { }

  ngOnInit() {
  
  }
   
  CreateWeb(head,collect){
    let bodys = {idUser:2,typeWebboard:this.type,headderWebboard:head,collectWebboard:collect} ;
  
    this.webservice.CreateWeb(bodys,result=>{
      Swal.fire(
        'สร้าง webboard สำเร็จ',
        '',
        'success'
      )
      this.router.navigate(['/home/webboard']);
    })
  }

}