import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/model/user/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url: string = "http://localhost:9999/user/login"

  constructor(private http: HttpClient) { }

  login(user: User, callback) {
    this.http.post(this.url, user).subscribe(data => {
      console.log(data);
      if (data["auth"] != null) {
        localStorage.setItem('auth', data["auth"]);
        return callback(true);
      }else{
        return callback(false);
      }
     
    })
  }

  logout() {
    localStorage.removeItem('auth');
  }

}
