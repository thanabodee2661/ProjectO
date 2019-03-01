import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Episode } from 'src/app/model/episode/episode.model';
import { BookService } from 'src/app/service/book/book.service';
import { EpisodeService } from 'src/app/service/episode/episode.service';

@Component({
  selector: 'app-episodelist',
  templateUrl: './episodelist.component.html',
  styleUrls: ['./episodelist.component.css']
})
export class EpisodelistComponent implements OnInit {

  episodes: Array<Episode>

  constructor(private route: ActivatedRoute, private router: Router, private bookService: BookService, private episodeService: EpisodeService) { }

  ngOnInit() {
    // this.route.snapshot.queryParamMap.get('id')
    console.log(this.route.snapshot.queryParamMap.get('id'));
    console.log(this.episodes);
    this.bookService.getEpisodeByID(this.route.snapshot.queryParamMap.get('id')).subscribe(episodes => {
      this.episodes = episodes;
    })
  }

  clickChangeComponent() {
    this.router.navigate(['home/profile/createepisode'], { queryParams: { id: this.route.snapshot.queryParamMap.get('id') } })
  }

  updateEpisode(episode: Episode) {
    console.log(episode);
    this.episodeService.changeEpisode(episode);
  }

}
