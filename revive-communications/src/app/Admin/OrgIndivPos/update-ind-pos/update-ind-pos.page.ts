import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-ind-pos',
  templateUrl: './update-ind-pos.page.html',
  styleUrls: ['./update-ind-pos.page.scss'],
})
export class UpdateIndPosPage implements OnInit {

  Usecases = [ "Usecase 1", "Usecase 2", "Usecase 3"];
  Goal = [ "Goal 1", "Goal 2", "Goal 3"];
  constructor() { }

  ngOnInit() {
  }

}
