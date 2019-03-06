import { Component, OnInit } from '@angular/core';
import { User } from '../../model/user/user.model';
import { Router } from '@angular/router';
import { RegisterService } from 'src/app/service/register/register.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User();

  file: File;
  imagePreview: string = "../../../assets/img/person.png";

  constructor(private router: Router, private registerService: RegisterService) { }

  ngOnInit() {
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
    console.log(this.user);

    Swal.fire({
      title: 'ยืนยันการสมัคร',
      type: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.value) {
        this.registerService.createUser(this.user, this.file).subscribe(data => {
          console.log(data);
          if (data > 0) {
            Swal.fire({
              type: 'success',
              title: 'สมัครสมาชิกสำเร็จ',
              toast: true,
              timer: 1500,
              position: 'top-end',
              showConfirmButton: false,
            })
          } else {
            Swal.fire({
              type: 'error',
              title: 'สมัครสมาชิกไม่สำเร็จ',
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
