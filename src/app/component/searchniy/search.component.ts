import { Component, OnInit } from '@angular/core';
import { SearchService } from '../../service/search/search.service';
import { searchall } from '../../model/admin/admin';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchniyComponent implements OnInit {
  searchall: searchall[] = [];
  searchText = "";
  p="";
  constructor(private searchservice: SearchService) { }

  ngOnInit() {
    this.SearchAll();
  }

  SearchAll() {
    this.searchservice.SearchAll(result => {
      console.log(result);
      
      this.searchall = result;
    })
  }
}