import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-ind-pos',
  templateUrl: './add-ind-pos.page.html',
  styleUrls: ['./add-ind-pos.page.scss'],
})
export class AddIndPosPage implements OnInit {

  Usecases = [ "Usecase 1", "Usecase 2", "Usecase 3"];
  Goal = [ "Goal 1", "Goal 2", "Goal 3"];
  constructor() { }

  ngOnInit() {
  }

}
