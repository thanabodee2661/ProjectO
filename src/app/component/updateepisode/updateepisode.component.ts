import { Component, OnInit } from '@angular/core';
import { EpisodeService } from 'src/app/service/episode/episode.service';
import { Episode } from 'src/app/model/episode/episode.model';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/user/user.model';
import { UserService } from 'src/app/service/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-updateepisode',
  templateUrl: './updateepisode.component.html',
  styleUrls: ['./updateepisode.component.css']
})
export class UpdateepisodeComponent implements OnInit {

  episode: Episode = new Episode()
  user: User;

  constructor(private episodeService: EpisodeService, private route: ActivatedRoute, private router: Router, private userService: UserService) { }

  ngOnInit() {

    this.userService.userCurrent.subscribe(user => {
      this.user = user;
      if (user.books != null) {
        this.episodeService.getEpisodeByIDEpisode(this.route.snapshot.paramMap.get('id')).subscribe(episode => {
          this.episode = episode;
        })
      } else {
        this.router.navigateByUrl('/home/profile/listyourniyay')
      }
    })

  }

  updataEpisode() {

    if (this.episode.content == '' || this.episode.name_episode == '') {
      Swal.fire({
        title: 'กรุณากรอกข้อมูลให้ครบทุกช่อง',
        type: 'warning',
        confirmButtonText: 'ตกลง'
      })
    } else {
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
          this.episodeService.updateEpisode(this.episode).subscribe(status => {
            if(status > 0){
              Swal.fire({
                type: 'success',
                title: 'แก้ไขสำเร็จ',
                toast: true,
                timer: 1500,
                position: 'top-end',
                showConfirmButton: false,
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

}
