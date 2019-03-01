import { Injectable } from '@angular/core';
import { Book } from 'src/app/model/book/book.medel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Episode } from 'src/app/model/episode/episode.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  book: Book;

  constructor(private http: HttpClient) { }

  createBook(formData: FormData) {
    console.log(formData);

    return this.http.post('http://localhost:9999/book', formData);
  }

  getBookByUser(id_user) {
    return <Observable<Book[]>>this.http.get('http://localhost:9999/book/' + id_user).pipe();
  }

  createEpisode(episode: Episode) {
    console.log('27');
    
    return this.http.post('http://localhost:9999/episode', episode);
  }

  getEpisodeByID(id_book){
    return <Observable<Episode[]>>this.http.get('http://localhost:9999/episodes/' + id_book).pipe();
  }
}
