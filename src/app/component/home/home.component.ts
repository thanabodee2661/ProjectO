import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/model/user/user.model';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  cars = [];
  cities1 = [];

  // @Input('getuser') getuser: User

  constructor(private userService: UserService) {
    this.cars = [
      { vin: 'r3278r2', year: 2010, brand: 'Audi', color: 'Black' },
      { vin: 'jhto2g2', year: 2015, brand: 'BMW', color: 'White' },
      { vin: 'h453w54', year: 2012, brand: 'Honda', color: 'Blue' },
      { vin: 'g43gwwg', year: 1998, brand: 'Renault', color: 'White' },
      { vin: 'gf45wg5', year: 2011, brand: 'VW', color: 'Red' },
      { vin: 'bhv5y5w', year: 2015, brand: 'Jaguar', color: 'Blue' },
      { vin: 'ybw5fsd', year: 2012, brand: 'Ford', color: 'Yellow' },
      { vin: '45665e5', year: 2011, brand: 'Mercedes', color: 'Brown' },
      { vin: 'he6sb5v', year: 2015, brand: 'Ford', color: 'Black' }
    ];

    this.cities1 = [
      { label: 'Select City', value: null },
      { label: 'New York', value: { id: 1, name: 'New York', code: 'NY' } },
      { label: 'Rome', value: { id: 2, name: 'Rome', code: 'RM' } },
      { label: 'London', value: { id: 3, name: 'London', code: 'LDN' } },
      { label: 'Istanbul', value: { id: 4, name: 'Istanbul', code: 'IST' } },
      { label: 'Paris', value: { id: 5, name: 'Paris', code: 'PRS' } }
    ];
  }

  ngOnInit() {
    this.userService.userCurrent.subscribe(user => {
      console.log(user);
      
    })

  }

  onClickService() {

  }

}
