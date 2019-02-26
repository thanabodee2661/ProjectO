import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user/user.model';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) {

  }

  ngOnInit() {

  }

  getUser(user) {
    this.userService.changeUser(user);
  }

}
