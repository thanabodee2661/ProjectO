import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user/user.service';
import { Router } from '@angular/router';
import { Book } from 'src/app/model/book/book.medel';
import { User } from 'src/app/model/user/user.model';

@Component({
  selector: 'app-yourbookfavor',
  templateUrl: './yourbookfavor.component.html',
  styleUrls: ['./yourbookfavor.component.css']
})
export class YourbookfavorComponent implements OnInit {


  books: Array<Book>;
  user: User;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.userCurrent.subscribe(user => {
      this.user = user;
      if (user.id_user != null) {
        console.log('24');

        this.userService.getFavorBook(this.user.id_user).subscribe(data => {
          this.books = data;
          data.forEach((book, i) => {
            if (book.img_book) {
              this.books[i].img_book = 'http://localhost:9999/imagebook/' + book.id_book + '/' + book.img_book;
            } else {
              this.books[i].img_book = "../../../assets/img/book.png";
            }
          })
        })
      }
    })
  }

  clickChangePage(id_book) {
    this.router.navigate(['home/lishepisodeinniyay'], { queryParams: { id_book: id_book } })
  }

}
