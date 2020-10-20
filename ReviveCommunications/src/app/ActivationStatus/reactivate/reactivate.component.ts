import { Component, OnInit } from '@angular/core';
import { NbSidebarService, NbMenuItem, NbToastrService } from '@nebular/theme';
import { ActivationstatusService } from 'src/app/Services/activationstatus.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';
import { MembersService } from 'src/app/Services/members.service';

@Component({
  selector: 'app-reactivate',
  templateUrl: './reactivate.component.html',
  styleUrls: ['./reactivate.component.scss']
})
export class ReactivateComponent implements OnInit {

  reactivate;

 Person:any;
 session:any;

  constructor(private sidebarService: NbSidebarService,
    private toastrService: NbToastrService,
    private activationStatusService: ActivationstatusService,
    private formbuilder: FormBuilder,
    private router: Router,
    private loginService : LoginService,
    private memberService: MembersService)
     {
       this.reactivate = this.formbuilder.group(
         {
           Username: ['', Validators.required],
           Password: ['', Validators.required]
         }
       )
     }

     SuccessMessage(position, status) {

      this.toastrService.show(
        status || 'Success',
        `Your request to reactivate your account has been sent.`,
        { position, status});
    }


  Logout()
  {
    localStorage.removeItem("accessToken");
    this.router.navigate([""]);
  }
  items: any[]

    //Dummy Data



    ngOnInit(): void {}

  
    onClick(form)
    {
      console.log(form);
      this.activationStatusService.RequestReactivate(form).subscribe(x=>{
      this.router.navigate(["/"]).then(() => {
        this.SuccessMessage('top-right', 'success');
      });
    });
    }

    toggle() {
      this.sidebarService.toggle(true);
      return false;
    }

    checked = false;

    select(checked: boolean) {
      this.checked = checked;
    }

    

    setData(updatePers)
  {
    this.memberService.setData(updatePers);
  }
}
