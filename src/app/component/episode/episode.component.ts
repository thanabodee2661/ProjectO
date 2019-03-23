import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EpisodeService } from 'src/app/service/episode/episode.service';
import { Episode, comment } from 'src/app/model/episode/episode.model';
import { CommentreportService } from '../../service/commentreport/commentreport.service';
import { UserService } from '../../service/user/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.css']
})
export class EpisodeComponent implements OnInit {
  lcomment: comment[] = [];
  id_user: number;
  episode: Episode = new Episode();
  checklogin: boolean = false;
  texts: String[] = [];

  constructor(private route: ActivatedRoute, private episodeService: EpisodeService, private commentservice: CommentreportService, private userService: UserService) { }

  ngOnInit() {
    if (localStorage.getItem('auth') != '' && localStorage.getItem('auth') != null) { //เช้คว่ามีการล้อคอินหรือไม่
      this.checklogin = true;
    }
    this.userService.userCurrent.subscribe(result => { // get ค่า user
      this.id_user = result.id_user;
    })
    this.episodeService.getEpisodeByIDEpisode(this.route.snapshot.queryParamMap.get('id_episode')).subscribe(episode => { //get episode จาก เบส
      this.episode = episode;
      this.episode.view = this.episode.view + 1;
      this.viewPlus();
      this.listcomment();
    })

  }

  viewPlus() {
    this.episodeService.updateEpisodeView(this.episode).subscribe(() => {

    })
  }

  Comment(collect) {
    this.commentservice.insertcomment(collect, result => {
      if (result) {
        this.commentservice.insertusercomment(this.id_user, result, this.episode.id_book, this.episode.id_episode, end => {
          // alert("success");
        })
      }
    })
  }

  listcomment() {
    this.commentservice.listcomment(this.episode.id_book, this.episode.id_episode, result => {
      this.lcomment = result;
      for (let i = 0; i < this.lcomment.length; i++) {
        this.texts[i] = this.lcomment[i].collectComment;
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
          this.commentservice.modifyusercomment(v1, v2, result => {
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
          this.commentservice.deleteusercomment(v1, result => {
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

  report(v1) {

    this.commentservice.reportusercomment(v1, result => {
      Swal.fire(
        'รายงานCommentนี้สำเร็จ',
        '',
        'success'
      )
    })
  }
}
