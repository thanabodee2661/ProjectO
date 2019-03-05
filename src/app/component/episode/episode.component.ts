import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EpisodeService } from 'src/app/service/episode/episode.service';
import { Episode } from 'src/app/model/episode/episode.model';

@Component({
  selector: 'app-episode',
  templateUrl: './episode.component.html',
  styleUrls: ['./episode.component.css']
})
export class EpisodeComponent implements OnInit {

  episode: Episode = new Episode();

  constructor(private route: ActivatedRoute, private episodeService: EpisodeService) { }

  ngOnInit() {

    this.episodeService.getEpisodeByIDEpisode(this.route.snapshot.queryParamMap.get('id_episode')).subscribe(episode => {
      this.episode = episode;
      console.log(episode)
      this.episode.view = this.episode.view + 1;
      this.viewPlus();
    })

  }

  viewPlus() {
    this.episodeService.updateEpisodeView(this.episode).subscribe(result => {
      console.log(result);

    })
  }

}
