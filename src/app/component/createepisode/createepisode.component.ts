import { Component, OnInit } from '@angular/core';
import { Episode } from 'src/app/model/episode/episode.model';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/service/book/book.service';

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
    this.bookService.createEpisode(this.episode).subscribe(d => {
      console.log(d);
      
    })
  }

}
