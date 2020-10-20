import { Component, OnInit } from '@angular/core';
import { CancelConfirmationDialogComponent } from '../../OrgStructPos/cancel-confirmation-dialog/cancel-confirmation-dialog.component';
import { NbDialogService, NbDialogRef } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cancel-confirm-oip',
  templateUrl: './cancel-confirm-oip.component.html',
  styleUrls: ['./cancel-confirm-oip.component.scss']
})
export class CancelConfirmOIPComponent implements OnInit {

  constructor(private dialogService: NbDialogService,
    protected ref: NbDialogRef<CancelConfirmationDialogComponent>,
    private router: Router) { }

  ngOnInit(): void {
  }

  No() {
    this.ref.close();
  }
  Yes(){
    this.router.navigate(["/ViewOrgIndivPos"]);
    this.ref.close();

  }
}
