import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbDialogRef } from '@nebular/theme';
import { CancelConfirmationDialogComponent } from '../../OrgStructPos/cancel-confirmation-dialog/cancel-confirmation-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-delete-dialog',
  templateUrl: './confirm-delete-dialog.component.html',
  styleUrls: ['./confirm-delete-dialog.component.scss']
})
export class ConfirmDeleteDialogComponent implements OnInit {


  constructor(private dialogService: NbDialogService,
    protected ref: NbDialogRef<CancelConfirmationDialogComponent>,
    private router: Router) { }

  ngOnInit(): void {
  }

  No() {
    this.router.navigate(["/SearchDiscipleship"]);
    this.ref.close();
  }
  Yes(){
    this.ref.close();

  }
}
