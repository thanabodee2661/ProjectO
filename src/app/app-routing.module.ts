import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { Page2Component } from './component/page2/page2.component';
import { RegisterComponent } from './component/register/register.component';
import { RouteComponent } from './component/route/route.component';
import { PagenotfoundComponent } from './component/pagenotfound/pagenotfound.component';
import { NiyayhitComponent } from './component/niyayhit/niyayhit.component';
import { NiyaynewComponent } from './component/niyaynew/niyaynew.component';
import { SearchComponent } from './component/search/search.component';
import { ProfileComponent } from './component/profile/profile.component';
import { CreateyourniyayComponent } from './component/createyourniyay/createyourniyay.component';
import { ListyourniyayComponent } from './component/listyourniyay/listyourniyay.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'admin', component: Page2Component,
    children: [

    ]
  },
  {
    path: 'home', component: RouteComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'niyayhit', component: NiyayhitComponent },
      { path: 'niyaynew', component: NiyaynewComponent },
      { path: 'search', component: SearchComponent },
      {
        path: 'profile', component: ProfileComponent,
        children: [
          { path: 'createyourniyay', component: CreateyourniyayComponent },
          { path: 'listyourniyay', component: ListyourniyayComponent }
        ]
      }
    ]
  },
  { path: '**', component: PagenotfoundComponent }

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }