import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Episode } from 'src/app/model/episode/episode.model';
import { BookService } from 'src/app/service/book/book.service';
import { EpisodeService } from 'src/app/service/episode/episode.service';
import { UserService } from 'src/app/service/user/user.service';
import { User } from 'src/app/model/user/user.model';

@Component({
  selector: 'app-episodelist',
  templateUrl: './episodelist.component.html',
  styleUrls: ['./episodelist.component.css']
})
export class EpisodelistComponent implements OnInit {

  episodes: Array<Episode>
  user: User

  constructor(private route: ActivatedRoute, private router: Router, private bookService: BookService, private episodeService: EpisodeService, private userService: UserService) { }

  ngOnInit() {
    // this.route.snapshot.queryParamMap.get('id')
    this.userService.userCurrent.subscribe(user => {
      this.user = user;
      if (user.books != null) {
        this.bookService.getEpisodeByID(this.route.snapshot.queryParamMap.get('id_book'), user.id_user).subscribe(episodes => {
          this.episodes = episodes;
          console.log(episodes);

        })
      } else {
        this.router.navigateByUrl('/home/profile/listyourniyay')
      }
    })
  }

  clickChangeComponent() {
    this.router.navigate(['home/profile/createepisode'], { queryParams: { id: this.route.snapshot.queryParamMap.get('id_book') } })
  }

  updateEpisode(episode: Episode) {
    console.log(episode);
    this.episodeService.changeEpisode(episode);
  }
}
