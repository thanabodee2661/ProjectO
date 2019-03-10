import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user/user.model';
import { UserService } from 'src/app/service/user/user.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.css']
})
export class UpdateprofileComponent implements OnInit {

  user: User;

  name: string
  lastname: string
  birthday: Date
  panname: string

  file: File;
  imagePreview: string;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.userCurrent.subscribe(user => {
      this.user = user;
      this.name = user.name
      this.lastname = user.lastname
      this.birthday = user.birthday
      this.panname = user.panname
      if (user.avatar != null) {
        this.imagePreview = "http://localhost:9999/img/" + user.id_user + "/" + user.avatar;
      } else {
        this.imagePreview = "../../../assets/img/person.png";
      }
    })
  }

  changeFile = (e) => {
    console.log(e.target.files[0]);
    this.file = e.target.files[0];
    this.user.avatar = e.target.files[0].name
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };

    reader.readAsDataURL(this.file);
  }

  onClickService() {
    Swal.fire({
      title: 'ยืนยันการแก้ไข',
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.value) {
        this.user.name = this.name
        this.user.panname = this.panname
        this.user.birthday = this.birthday
        this.user.lastname = this.lastname
        this.userService.updateUser(this.user, this.file).subscribe(data => {
          if(data['auth'] != null){
            localStorage.setItem('auth', data['auth'])
            Swal.fire({
              type: 'success',
              title: 'แก้ไขสำเร็จ',
              toast: true,
              timer: 1500,
              position: 'top-end',
              showConfirmButton: false,
            })

            Swal.fire({
              title: 'กลับหน้า HOME',
              type: 'question',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'OK',
            }).then((result) => {
              if(result.value){
                this.router.navigateByUrl('/home')
              }
            })

          }else{
            Swal.fire({
              type: 'error',
              title: 'แก้ไขไม่สำเร็จ',
              toast: true,
              timer: 1500,
              position: 'top-end',
              showConfirmButton: false,
            })
          }
        })
      }
    })
  }

}
