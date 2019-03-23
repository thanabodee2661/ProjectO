import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/model/book/book.medel';
import { UserService } from 'src/app/service/user/user.service';
import { User } from 'src/app/model/user/user.model';
import { BookService } from 'src/app/service/book/book.service';
import { Typebook } from 'src/app/model/typebook/typebook';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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

  typebooks: Array<Typebook>;
  temptypebook: Array<Typebook> = new Array<Typebook>();

  constructor(private userService: UserService, private bookService: BookService, private router: Router) { }

  ngOnInit() {
    if (localStorage.getItem('auth') != '' && localStorage.getItem('auth') != null) { // ถ้าเข้าโปรแกรมมาแล้วมีการล้อคอินค้างไว้
      this.userService.userCurrent.subscribe(user => { //เรียก service เพื่อ get ค่า user ที่เก็บไว้
        this.user = user;
      })
      this.bookService.getTypeBook().subscribe(typebook => { //เรียก service เพื่อ get ค่า ประเภทหนังสือ จากเบส
        this.typebooks = typebook;
      })
    } else {
      this.router.navigateByUrl('home/page404');
    }
  }

  changeFile = (e) => { //เลือกรูป
    this.file = e.target.files[0];
    this.book.img_book = e.target.files[0].name;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(this.file);
  }

  createBook() {
    if (this.book.name_fiction == null || this.temptypebook.length == 0 || this.book.preview == null) { //เช้คว่ากรอกค่ามาทั้งช่องไหม
      Swal.fire({
        title: 'กรุณากรอกข้อมูลให้ครบทุกช่อง',
        type: 'warning'
      })
    } else {
      Swal.fire({
        title: 'ยืนยันการสร้าง',
        type: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก',
      }).then((result) => {
        if (result.value) {
          const formData = new FormData();
          formData.append('name_fiction', this.book.name_fiction);
          formData.append('preview', this.book.preview)
          formData.append('id_user', this.user.id_user.toString())
          formData.append('img_book', this.book.img_book)
          formData.append('typebooks', JSON.stringify(this.temptypebook))
          formData.append('file', this.file)

          this.bookService.createBook(formData).subscribe(data => { //เรียก service สร้าง หนังสือ
            if (data > 0) {
              Swal.fire({
                type: 'success',
                title: 'สร้างสำเร็จ',
                toast: true,
                timer: 1500,
                position: 'top-end',
                showConfirmButton: false,
              })
            } else {
              Swal.fire({
                type: 'error',
                title: 'สร้างไม่สำเร็จ',
                toast: true,
                timer: 1500,
                position: 'top-end',
                showConfirmButton: false,
              })
            }
          })
        }
      })
    }
  }

  onChangeTypeView($event) { //เมื่อมีการเลือก type book 
    this.temptypebook.push(this.typebooks[$event.target.value]) //แอดค่าเข้าไปใน array อันใหม่ 
    this.typebooks.splice($event.target.value, 1) // ลบข้อมูลจาก array อันเดิม
  }

  onClickExitType(i) { //เมื่อมีการลบ typebook ออก
    this.typebooks.push(this.temptypebook[i]); //แอดค่าเข้าไปใน array อันเดิม 
    this.temptypebook.splice(i, 1); // ลบข้อมูลจาก array อันใหม่
  }


}
