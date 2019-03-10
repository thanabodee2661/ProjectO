import { Component, OnInit } from '@angular/core';
import { Episode } from 'src/app/model/episode/episode.model';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/service/book/book.service';
import Swal from 'sweetalert2';
import { UserService } from 'src/app/service/user/user.service';
import { User } from 'src/app/model/user/user.model';

@Component({
  selector: 'app-createepisode',
  templateUrl: './createepisode.component.html',
  styleUrls: ['./createepisode.component.css']
})
export class CreateepisodeComponent implements OnInit {

  episode: Episode = new Episode();
  user: User;

  constructor(private route: ActivatedRoute, private bookService: BookService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.episode.id_book = Number(this.route.snapshot.queryParamMap.get('id'));
    this.userService.userCurrent.subscribe(user => {
      this.user = user;
      if (user.books == null) {
        this.router.navigateByUrl('/home/profile/listyourniyay')
      }
    })
  }

  createEpisode() {
    console.log(this.episode.name_episode);

    if (this.episode.content == null || this.episode.name_episode == null) {
      Swal.fire({
        title: 'กรุณากรอกข้อมูลให้ครบทุกช่อง',
        type: 'warning'
      })
    } else {
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
          this.bookService.createEpisode(this.episode).subscribe(data => {
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

}
