import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/model/book/book.medel';
import { UserService } from 'src/app/service/user/user.service';
import { User } from 'src/app/model/user/user.model';
import { BookService } from 'src/app/service/book/book.service';

@Component({
  selector: 'app-createyourniyay',
  templateUrl: './createyourniyay.component.html',
  styleUrls: ['./createyourniyay.component.css']
})
export class CreateyourniyayComponent implements OnInit {

  file: File;
  imagePreview: string = "../../../assets/img/book.png";
  book: Book = new Book();
  user: User = new User();

  constructor(private userService: UserService, private bookService: BookService) { }

  ngOnInit() {
    this.userService.userCurrent.subscribe(user => {
      this.user = user;
      console.log(user);

    })
  }

  changeFile = (e) => {
    console.log(e.target.files[0]);
    this.file = e.target.files[0];
    // this.user.avatar = e.target.files[0].name
    this.book.img_book = e.target.files[0].name;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(this.file);
  }

  createBook() {
    // console.log(this.book);

    const formData = new FormData();
    formData.append('name_fiction', this.book.name_fiction);
    formData.append('preview', this.book.preview)
    formData.append('id_user', this.user.id_user.toString())
    formData.append('img_book', this.book.img_book)
    formData.append('file', this.file)

    this.bookService.createBook(formData).subscribe(data => {
      console.log(data);

    })
  }

}
