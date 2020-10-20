import { Component, OnInit } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { NbDialogRef } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cancel-confirmation-dialog',
  templateUrl: './cancel-confirmation-dialog.component.html',
  styleUrls: ['./cancel-confirmation-dialog.component.scss']
})
export class CancelConfirmationDialogComponent implements OnInit {
 

  constructor(private dialogService: NbDialogService,protected ref: NbDialogRef<CancelConfirmationDialogComponent>,private router: Router) { }

  ngOnInit(): void {
  }

  No() {
    this.ref.close();
  }
  Yes(){
    this.router.navigate([""]);
    this.ref.close();
    
  }
  

}
