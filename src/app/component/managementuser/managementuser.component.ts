import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { commentreport, checkwebboard, adminWebboard2 } from '../../model/admin/admin';
import { CommentreportService } from '../../service/commentreport/commentreport.service';

import Swal from 'sweetalert2'
import { WebboardService } from '../../service/webboard/webboard.service';


@Component({
  selector: 'app-managementuser',
  templateUrl: './managementuser.component.html',
  styleUrls: ['./managementuser.component.css']
})
export class ManagementuserComponent implements OnInit {
  displayDialog: boolean;
  userReport: commentreport[] = [];
  cwebboard: checkwebboard[] = [];
  admin:adminWebboard2[]=[];
  constructor(private http: HttpClient, private usercomment: CommentreportService,private webservice:WebboardService) { }

  ngOnInit() {
    this.commentReport();
    this.Checkwebboardreport();
    this.adminwebboard();
  }

  adminwebboard(){
    this.webservice.foradminsearchdelete(result=>{
      this.admin=result;
    })
  }

  commentReport() {
    this.usercomment.CommentReport((result) => {
      this.userReport = result;
    })
  }

  confirm1(v1) {
    const swalWithBootstrapButtons = Swal.mixin({
      cancelButtonClass: 'btn btn-danger',
      confirmButtonClass: 'btn btn-success',
      buttonsStyling: false,
    })

    swalWithBootstrapButtons.fire({
      title: 'Comment นี้ไม่ผิดกฏใช่หรือไม่',
      text: "กด Yes ถ้าต้องการดำเนินการต่อ!",
      type: 'warning',
      showCancelButton: true,
      cancelButtonText: 'No, cancel!',
      confirmButtonText: 'Yes, Success!'
    }).then((result) => {

      if (result.value) {
        swalWithBootstrapButtons.fire(
          'Success',
          '',
          'success'
        ).then((result)=>{
          this.usercomment.CanCelBan(v1, result => {

          })
          setTimeout(() => {
            location.reload();
          }, 800);
        })
      } else if (
        // Read more about handling dismissals
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancel',
          '',
          'error'
        )
      }
    })
  }

  confirm2(v1, v2) {
    const swalWithBootstrapButtons = Swal.mixin({
      cancelButtonClass: 'btn btn-danger',
      confirmButtonClass: 'btn btn-success',
      buttonsStyling: false,
    })

    swalWithBootstrapButtons.fire({
      title: 'Comment นี้ผิดกฏใช่หรือไม่',
      text: "กด Yes ถ้าต้องการแบน!",
      type: 'question',
      showCancelButton: true,
      cancelButtonText: 'No, cancel!',
      confirmButtonText: 'Yes, แบน!'
    }).then((result) => {
      if (result.value) {
        swalWithBootstrapButtons.fire(
          'Success',
          'ทำการแบนสำเร็จ',
          'success'
        ).then((result)=>{
          this.usercomment.Banuser(v1, v2, result => {

          })
          setTimeout(() => {
            location.reload();
          }, 800);
        })
      } else if (
        // Read more about handling dismissals
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancel',
          '',
          'error'
        )
      }
    })
  }

  Checkwebboardreport(){
    this.webservice.Checkwebboardreport(result=>{
      this.cwebboard = result;
    })
  }

  confirm3(num){
    const swalWithBootstrapButtons = Swal.mixin({
      cancelButtonClass: 'btn btn-danger',
      confirmButtonClass: 'btn btn-success',
      buttonsStyling: false,
    })

    swalWithBootstrapButtons.fire({
      title: 'Comment นี้ไม่ผิดกฏใช่หรือไม่',
      text: "กด Yes ถ้าต้องการดำเนินการต่อ!",
      type: 'warning',
      showCancelButton: true,
      cancelButtonText: 'No, cancel!',
      confirmButtonText: 'Yes, Success!'
    }).then((result) => {
      if (result.value) {
        
        swalWithBootstrapButtons.fire(
          'Success',
          '',
          'success'
        ).then((result)=>{
          this.webservice.Webboardcancelban(num, result => {
          })
          setTimeout(() => {
            location.reload();
          }, 800);
        })
      } else if (
        // Read more about handling dismissals
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancel',
          '',
          'error'
        )
      }
    })
  }

  confirm4(num){
    const swalWithBootstrapButtons = Swal.mixin({
      cancelButtonClass: 'btn btn-danger',
      confirmButtonClass: 'btn btn-success',
      buttonsStyling: false,
    })

    swalWithBootstrapButtons.fire({
      title: 'Comment นี้ผิดกฏใช่หรือไม่',
      text: "กด Yes ถ้าต้องการแบน!",
      type: 'question',
      showCancelButton: true,
      cancelButtonText: 'No, cancel!',
      confirmButtonText: 'Yes, แบน!'
    }).then((result) => {
      if (result.value) {
        swalWithBootstrapButtons.fire(
          'Success',
          'ทำการแบนสำเร็จ',
          'success'
        ).then((result)=>{
          this.webservice.Webboardbanuser(num, result => {

          })
          setTimeout(() => {
            location.reload();
          }, 800);
        })
      } else if (
        // Read more about handling dismissals
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancel',
          '',
          'error'
        )
      }
    })
  }

  confirm5(v1){
    console.log(v1);
    const swalWithBootstrapButtons = Swal.mixin({
      cancelButtonClass: 'btn btn-danger',
      confirmButtonClass: 'btn btn-success',
      buttonsStyling: false,
    })

    swalWithBootstrapButtons.fire({
      title: 'ต้องการ ลบโพส นี้ใช่หรือไม่',
      text: "กด Yes หากต้องการลบ!",
      type: 'question',
      showCancelButton: true,
      cancelButtonText: 'No, cancel!',
      confirmButtonText: 'Yes, Delete!'
    }).then((result) => {
      if (result.value) {
        swalWithBootstrapButtons.fire(
          'Success',
          'ทำการลบสำเร็จ',
          'success'
        ).then((result)=>{
          this.webservice.admindeletewebboard(v1, result => {

          })
          setTimeout(() => {
            location.reload();
          }, 800);
        })
      } else if (
        // Read more about handling dismissals
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancel',
          '',
          'error'
        )
      }
    })
  }
}