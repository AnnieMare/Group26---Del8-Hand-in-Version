import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-out-child-dialog',
  templateUrl: './sign-out-child-dialog.component.html',
  styleUrls: ['./sign-out-child-dialog.component.scss']
})
export class SignOutChildDialogComponent implements OnInit {

  constructor() { }

  loading = false;
  
  toggleLoadingAnimation() {
    this.loading = true;
    setTimeout(() => this.loading = false, 3000);
  }

  

  ngOnInit(): void {
  }

}
