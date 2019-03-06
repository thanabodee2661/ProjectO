import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { WebboardService } from '../../service/webboard/webboard.service';
import { main, comment } from '../../model/admin/admin';
import Swal from 'sweetalert2';
import { JwtService } from '../../service/jwt/jwt.service';
import { User } from '../../model/user/user.model';

@Component({
  selector: 'app-descriptionwebboard',
  templateUrl: './descriptionwebboard.component.html',
  styleUrls: ['./descriptionwebboard.component.css']
})
export class DescriptionwebboardComponent implements OnInit {
  main: main[] = [];
  comment: comment[] = [];
  id: number;
  texts: string[] = [];
  collecttext = "";
  text = ""
  p = "";
  user: User = new User();
  gg: number = 0;
  checklogin: boolean = false;
  cCommentModifyDelelt: boolean = false;
  testcommentcheck: boolean = false;
  constructor(private route: ActivatedRoute, private webservice: WebboardService, private jwt: JwtService, private router: Router) {
  }

  ngOnInit() {
    if (localStorage.getItem('auth') != '' && localStorage.getItem('auth') != null) {

      this.jwt.getDecodedAccessToken(localStorage.getItem('auth'), (user) => {
        if (user) {
          this.checklogin = true;
          this.user = user.id_user;
          this.gg = user.id_user;
        }
      })
    }

    this.route.queryParams.pipe(
      filter(event => event.id)
    ).subscribe((event) => {
      this.id = event.id
      this.GetTopic(this.id);
      this.GetComment(this.id);
    });

  }

  GetComment(num) {
    let body = { idWebboard: num };
    this.webservice.Commentwebboard(body, result => {
      this.comment = result;
      for (let i = 0; i < this.comment.length; i++) {
        this.texts[i] = this.comment[i].collectWebboard;
      }
    })
  }
  GetTopic(num) {
    let body = { idWebboard: num };
    this.webservice.Typewebboard(body, result => {
      this.main = result;
      this.text = this.main[0].headderWebboard;
      this.collecttext = this.main[0].collectWebboard;
      if (this.gg == this.main[0].idUser) {
        this.cCommentModifyDelelt = true;
      }
    })
  }

  Comment(data) {
    let body = { idUser: this.gg, idWebboard: this.id, collectUserWebboard: data };
    this.webservice.Createcommentwebboard(body, result => {
      Swal.fire(
        'สร้าง comment สำเร็จ',
        '',
        'success'
      )
      setTimeout(() => {
        location.reload();
      }, 800);
    })
  }

  report(v1) {
    this.webservice.setStatus1(v1, result => {
      Swal.fire(
        'รายงานCommentนี้สำเร็จ',
        '',
        'success'
      )

    })
  }

  modify(head, collect, v3) {
    const swalWithBootstrapButtons = Swal.mixin({
      cancelButtonClass: 'btn btn-danger',
      confirmButtonClass: 'btn btn-success',
      buttonsStyling: false,
    })

    swalWithBootstrapButtons.fire({
      title: 'ต้องการแก้ไข Webboard ใช่หรือไม่',
      text: "กด Yes ถ้าต้องการแก้ไข!",
      type: 'question',
      showCancelButton: true,
      cancelButtonText: 'No, ยกเลิก!',
      confirmButtonText: 'Yes, แก้ไข!'
    }).then((result) => {
      if (result.value) {
        swalWithBootstrapButtons.fire(
          'Success',
          'ทำการแก้ไขสำเร็จ',
          'success'
        ).then((result) => {
          this.webservice.usermodifywebboard(v3, head, collect, result => {
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

  deleteweb(v1) {
    const swalWithBootstrapButtons = Swal.mixin({
      cancelButtonClass: 'btn btn-danger',
      confirmButtonClass: 'btn btn-success',
      buttonsStyling: false,
    })

    swalWithBootstrapButtons.fire({
      title: 'ต้องการลบ Webboard ใช่หรือไม่',
      text: "กด Yes ถ้าต้องการลบ!",
      type: 'question',
      showCancelButton: true,
      cancelButtonText: 'No, ยกเลิก!',
      confirmButtonText: 'Yes, ลบ!'
    }).then((result) => {
      if (result.value) {
        swalWithBootstrapButtons.fire(
          'Success',
          'ทำการลบไขสำเร็จ',
          'success'
        ).then((result) => {
          this.webservice.admindeletewebboard(v1, result => {
          })
          setTimeout(() => {
            this.router.navigate(['/home/webboard']);
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

  modifycomment(v1, v2) {
    const swalWithBootstrapButtons = Swal.mixin({
      cancelButtonClass: 'btn btn-danger',
      confirmButtonClass: 'btn btn-success',
      buttonsStyling: false,
    })

    swalWithBootstrapButtons.fire({
      title: 'ต้องการแก้ไข Comment ใช่หรือไม่',
      text: "กด Yes ถ้าต้องการแก้ไข!",
      type: 'question',
      showCancelButton: true,
      cancelButtonText: 'No, ยกเลิก!',
      confirmButtonText: 'Yes, แก้ไข!'
    }).then((result) => {
      if (result.value) {
        swalWithBootstrapButtons.fire(
          'Success',
          'ทำการแก้ไขสำเร็จ',
          'success'
        ).then((result) => {
          this.webservice.usermodifycomment(v1, v2, result => {
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

  deletecomment(v1) {
    const swalWithBootstrapButtons = Swal.mixin({
      cancelButtonClass: 'btn btn-danger',
      confirmButtonClass: 'btn btn-success',
      buttonsStyling: false,
    })

    swalWithBootstrapButtons.fire({
      title: 'ต้องการลบ Webboard ใช่หรือไม่',
      text: "กด Yes ถ้าต้องการลบ!",
      type: 'question',
      showCancelButton: true,
      cancelButtonText: 'No, ยกเลิก!',
      confirmButtonText: 'Yes, ลบ!'
    }).then((result) => {
      if (result.value) {
        swalWithBootstrapButtons.fire(
          'Success',
          'ทำการลบไขสำเร็จ',
          'success'
        ).then((result) => {
          this.webservice.userdeletecomment(v1, result => {
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