import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/service/book/book.service';
import { Book } from 'src/app/model/book/book.medel';
import { User } from 'src/app/model/user/user.model';
import { UserService } from 'src/app/service/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listyourniyay',
  templateUrl: './listyourniyay.component.html',
  styleUrls: ['./listyourniyay.component.css']
})
export class ListyourniyayComponent implements OnInit {

  books: Array<Book>;
  user: User;

  constructor(private bookService: BookService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.userCurrent.subscribe(user => {
      this.user = user;
      this.bookService.getBookByUser(this.user.id_user).subscribe(data => {
        this.books = data;
        data.forEach((book, i) => {
          if (book.img_book) {
            this.books[i].img_book = 'http://localhost:9999/imagebook/' + book.id_book + '/' + book.img_book;
          } else {
            this.books[i].img_book = "../../../assets/img/book.png";
          }
        })
      })
    })
  }

  clickChangePage(id) {
    this.router.navigate(['home/profile/episodelist'], { queryParams: { id: id } });
  }
}
