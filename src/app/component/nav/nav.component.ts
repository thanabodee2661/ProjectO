import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router'
import { LoginService } from 'src/app/service/login/login.service';
import { User } from 'src/app/model/user/user.model';
import { JwtService } from 'src/app/service/jwt/jwt.service';
import { EmailService } from '../../service/email/email.service';
import Swal from 'sweetalert2';
import { DepFlags } from '@angular/compiler/src/core';
import { splitDepsDsl } from '@angular/core/src/view/util';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  closeResult: string;
  isCollapsed = true;
  user: User = new User();
  status_login: boolean = false;


  @Output() getuser = new EventEmitter<User>();

  constructor(private modalService: NgbModal, private router: Router, private loginService: LoginService, private jwt: JwtService, private emailservice: EmailService) { }

  open(content) {
    console.log(content);

    this.modalService.open(content);
  }

  changePageRegister() {

    console.log(this.router.url);

    this.router.navigateByUrl('/home/register');
    this.modalService.dismissAll()
  }

  ngOnInit() {

    if (localStorage.getItem('auth') != '' && localStorage.getItem('auth') != null) {
      this.status_login = true;
      this.jwt.getDecodedAccessToken(localStorage.getItem('auth'), (user) => {
        if (user) {
          console.log(user);
          this.user = user;
          this.sendUserNav();
        }
      });
    }
  }

  login() {
    this.loginService.login(this.user, (dataAuth) => {

      if (dataAuth) {
        console.log("38 nav");
        this.status_login = dataAuth;
        this.jwt.getDecodedAccessToken(localStorage.getItem('auth'), (user) => {
          if (user) {
            console.log(user);
            // this.user.panname = user.panname;
            this.user = user;
            this.sendUserNav();
          }
          this.modalService.dismissAll();
        });

      } else {
        this.status_login = dataAuth;
      }
    });
  }

  logout() {

    this.loginService.logout();
    this.status_login = false;
    this.user = new User();
    console.log(this.user);
    this.sendUserNav();
    this.checkLogout();
  }

  onClickChangePage(path: string) {
    this.router.navigateByUrl("/home/" + path);
  }

  sendUserNav() {
    this.getuser.emit(this.user);
  }

  forgotpass() {
    if (this.user.email == undefined) {
      Swal.fire(
        'กรุณากรอกอีเมลล์ของท่าน',
        '',
        'warning'
      )
    } else {
      this.emailservice.forgetpassword(this.user.email, result => {
        Swal.fire(
          'ส่ง อีเมลล์ สำเร็จ',
          'กรุณาเช็คที่อีเมลล์ของท่านเพื่อเปลี่ยนรหัสผ่าน',
          'success'
        ).then(result => {
          this.modalService.dismissAll();
        })
      })
    }
  }

  checkLogout() {
    let url = this.router.url.split('/');
    let checkURL = url.find(this.findPath)
    if(checkURL != null){
      this.router.navigateByUrl('/home/page404')
    }
  }

  findPath(path) {
    return path == 'profile';
  }
}