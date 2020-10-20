import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview-structure',
  templateUrl: './overview-structure.page.html',
  styleUrls: ['./overview-structure.page.scss'],
})
export class OverviewStructurePage implements OnInit {


  Structures = [
    {key: '1', text: "Structure 1"},
    {key: '2', text: "Structure 2"},
    {key: '3', text: "Structure 3"}
    ];
  constructor() { }

  ngOnInit() {
  }

}
