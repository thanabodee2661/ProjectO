import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/model/book/book.medel';
import { BookService } from 'src/app/service/book/book.service';
import { Typebook } from 'src/app/model/typebook/typebook';

@Component({
  selector: 'app-niyayhit',
  templateUrl: './niyayhit.component.html',
  styleUrls: ['./niyayhit.component.css']
})
export class NiyayhitComponent implements OnInit {

  books_hit: Array<Book>
  Books_hit_filter: Array<Book>
  typebooks: Array<Typebook>

  searchtxt: string;

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.bookService.getBookByOrderView(0, 100).subscribe(books => {
      this.books_hit = books;
      this.Books_hit_filter = books;
      console.log(this.Books_hit_filter);


      books.forEach((book, i) => {
        if (book.img_book) {
          this.books_hit[i].img_book = 'http://localhost:9999/imagebook/' + book.id_book + '/' + book.img_book;
          this.Books_hit_filter[i].img_book = book.img_book;
        } else {
          this.books_hit[i].img_book = "../../../assets/img/book.png";
          this.Books_hit_filter[i].img_book = "../../../assets/img/book.png";
        }
      })
    })

    this.bookService.getTypeBook().subscribe(type => {
      this.typebooks = type
    })
  }

  onChangeTypeView($event) {
    console.log($event.target.value);
    this.books_hit = this.Books_hit_filter.filter(book => {
      let isMacth = false;
      book.typebook.forEach(typebook => {
        if (typebook.id_type == $event.target.value || $event.target.value == 0) isMacth = true;
      })
      return isMacth;
    })
  }

  onKeyUpSearch() {
    console.log(this.searchtxt);
    
    this.books_hit = this.Books_hit_filter.filter(book => {
      return book.name_fiction.includes(this.searchtxt)
    })
  }

}
