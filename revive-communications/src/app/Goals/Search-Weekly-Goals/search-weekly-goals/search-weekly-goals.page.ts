import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-weekly-goals',
  templateUrl: './search-weekly-goals.page.html',
  styleUrls: ['./search-weekly-goals.page.scss'],
})
export class SearchWeeklyGoalsPage implements OnInit {
  show: boolean;
  constructor() { }

  ngOnInit() {
  }

  Check(){
    if(this.show == false)
    {
      this.show = true;
    }
    else{
      this.show = false;
    }
}}
