import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbDialogRef } from '@nebular/theme';
import { CancelConfirmationDialogComponent } from '../../OrgStructPos/cancel-confirmation-dialog/cancel-confirmation-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-delete-oipdialog',
  templateUrl: './confirm-delete-oipdialog.component.html',
  styleUrls: ['./confirm-delete-oipdialog.component.scss']
})
export class ConfirmDeleteOIPDialogComponent implements OnInit {

  constructor(private dialogService: NbDialogService,
    protected ref: NbDialogRef<CancelConfirmationDialogComponent>,
    private router: Router) { }

  ngOnInit(): void {
  }

  No() {
    this.router.navigate(["/ViewOrgIndivPos"]);
    this.ref.close();
  }
  Yes(){
    this.ref.close();

  }
}
