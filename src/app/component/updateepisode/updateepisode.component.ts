import { Component, OnInit } from '@angular/core';
import { EpisodeService } from 'src/app/service/episode/episode.service';
import { Episode } from 'src/app/model/episode/episode.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-updateepisode',
  templateUrl: './updateepisode.component.html',
  styleUrls: ['./updateepisode.component.css']
})
export class UpdateepisodeComponent implements OnInit {

  episode: Episode = new Episode()

  constructor(private episodeService: EpisodeService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.episodeService.episodeCurrent.subscribe(episode => {
      if (typeof (episode.id_book) == 'undefined') {
        console.log(this.route.snapshot.paramMap.get('id'));

        this.episodeService.getEpisodeByIDEpisode(this.route.snapshot.paramMap.get('id')).subscribe(episode => {
          this.episode = episode;
        })
      } else {
        this.episode = episode;
      }

    })
  }

  updataEpisode(){
    this.episodeService.updateEpisode(this.episode).subscribe(status => {
      console.log(status);
      
    })
  }

}
