import { Component, OnInit } from '@angular/core';
import { CancelConfirmationDialogComponent } from 'src/app/Admin/OrgStructPos/cancel-confirmation-dialog/cancel-confirmation-dialog.component';
import { NbDialogService, NbDialogRef } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cancel-confirm-discipleship',
  templateUrl: './cancel-confirm-discipleship.component.html',
  styleUrls: ['./cancel-confirm-discipleship.component.scss']
})
export class CancelConfirmDiscipleshipComponent implements OnInit {

  constructor(private dialogService: NbDialogService,
    protected ref: NbDialogRef<CancelConfirmationDialogComponent>,
    private router: Router) { }

  ngOnInit(): void {
  }

  No() {
    this.ref.close();
  }
  Yes(){
    this.router.navigate(["/SearchDiscipleship"]);
    this.ref.close();

  }

}
