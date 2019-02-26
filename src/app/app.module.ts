import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';


import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { DropdownModule } from 'primeng/dropdown';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './component/home/home.component';
import { NavComponent } from './component/nav/nav.component';
import { Page2Component } from './component/page2/page2.component';
import { RegisterComponent } from './component/register/register.component';
import { RouteComponent } from './component/route/route.component';
import { PagenotfoundComponent } from './component/pagenotfound/pagenotfound.component';
import { NiyayhitComponent } from './component/niyayhit/niyayhit.component';
import { NiyaynewComponent } from './component/niyaynew/niyaynew.component';
import { SearchComponent } from './component/search/search.component';
import { RegisterService } from './service/register/register.service';
import { LoginService } from './service/login/login.service';
import { JwtService } from './service/jwt/jwt.service';
import { ProfileComponent } from './component/profile/profile.component';
import { UserService } from './service/user/user.service';
import { CreateyourniyayComponent } from './component/createyourniyay/createyourniyay.component';
import { BookService } from './service/book/book.service';
import { ListyourniyayComponent } from './component/listyourniyay/listyourniyay.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    Page2Component,
    RegisterComponent,
    RouteComponent,
    PagenotfoundComponent,
    NiyayhitComponent,
    NiyaynewComponent,
    SearchComponent,
    ProfileComponent,
    CreateyourniyayComponent,
    ListyourniyayComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ButtonModule,
    AppRoutingModule,
    CarouselModule,
    DropdownModule,
    HttpClientModule
  ],
  providers: [
    RegisterService,
    LoginService,
    JwtService,
    UserService,
    BookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }