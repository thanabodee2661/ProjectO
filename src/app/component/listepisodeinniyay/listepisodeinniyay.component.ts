import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/service/book/book.service';
import { EpisodeService } from 'src/app/service/episode/episode.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from 'src/app/model/book/book.medel';

@Component({
  selector: 'app-listepisodeinniyay',
  templateUrl: './listepisodeinniyay.component.html',
  styleUrls: ['./listepisodeinniyay.component.css']
})
export class ListepisodeinniyayComponent implements OnInit {

  book: Book = new Book();

  constructor(private bookService: BookService, private episodeService: EpisodeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    console.log(this.route.snapshot.queryParamMap.get("id_book"));

    this.bookService.getBookByID(this.route.snapshot.queryParamMap.get("id_book")).subscribe(book => {
      this.book = book[0];
      console.log(book[0]);
      if (book[0].img_book) {
        this.book.img_book = 'http://localhost:9999/imagebook/' + book[0].id_book + '/' + book[0].img_book;
      } else {
        this.book.img_book = "../../../assets/img/book.png";
      }
    })
    
  }

  loadEpisode() {
    console.log(this.book.episode.length);
    this.episodeService.getEpisodeByIDOrder(this.book.id_book, this.book.episode.length).subscribe(episodes => {
      console.log(episodes);
      
      episodes.forEach(episode => {
        this.book.episode.push(episode);
      })
    })
  }

  onClickChangePageEpisode(index){
    this.episodeService.changeEpisode(this.book.episode[index])
    this.router.navigate(['home/episode'], { queryParams: { id_book: this.book.id_book, id_episode: this.book.episode[index].id_episode }})
  }

}
