import { Component, OnInit } from '@angular/core';
import { Episode } from 'src/app/model/episode/episode.model';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/service/book/book.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-createepisode',
  templateUrl: './createepisode.component.html',
  styleUrls: ['./createepisode.component.css']
})
export class CreateepisodeComponent implements OnInit {

  episode: Episode = new Episode();

  constructor(private route: ActivatedRoute, private bookService: BookService) { }

  ngOnInit() {
    this.episode.id_book = Number(this.route.snapshot.queryParamMap.get('id'));
  }

  createEpisode() {
    console.log(this.episode);


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
