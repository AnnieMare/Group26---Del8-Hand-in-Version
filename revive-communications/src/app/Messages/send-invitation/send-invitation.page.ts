import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LoginService } from 'src/app/Services/login.service';
import { MessageService } from 'src/app/Services/message.service';

@Component({
  selector: 'app-send-invitation',
  templateUrl: './send-invitation.page.html',
  styleUrls: ['./send-invitation.page.scss'],
})
export class SendInvitationPage implements OnInit {

 
      
    constructor(
      private toastrService: ToastController,
      private service: MessageService,
        private router : Router,
      private loginService: LoginService
    ) { }
    Persons: any[];
    isChecked = [];
    SelectedReceivers =[];
    Person:any;
    session:any;
   
    minDate 
   
    PersonID
  ngOnInit() {
    
  
  if(!localStorage.getItem("accessToken")){
    this.router.navigate(['']);
  }
  else{
    this.session ={"SessionID": localStorage.getItem("accessToken")}
    this.loginService.getUserDetails(this.session).subscribe(res =>{
      this.Person = res;
      console.log(this.Person)
      
      this.PersonID = this.Person.PersonID
      console.log(   this.PersonID )
    })
  }


  this.minDate = Date.now();
  this.service.getPeople().subscribe(x =>{
    this.Persons = x;
  })
  }

  changeSelection(item) {

    if(this.SelectedReceivers.includes(item)) {
      this.SelectedReceivers = this.SelectedReceivers.filter((value)=>value!=item);

    } else {
      this.SelectedReceivers.push(item)
    // }
    // this.SelectedReceivers = this.Persons.filter((value, index) => {
    //   return value.isChecked
    // });
  }
}

  
  checked = false;

  select(checked: boolean) {
    this.checked = checked;
  }

  async presentToast() {
    const toast = await this.toastrService.create({
      message: 'Invitation sent successfully.',
      duration: 2000
    });
    toast.present();
  }

  checkbox1 = false; 

  onSubmit(inv){
    console.log(inv)
    this.service.sendInvitation(inv).subscribe(x =>{
      console.log(x);
     location.reload();
      this.presentToast()
    });

  }

  showWA = false
  receiversSelected(){
    this.showWA = true
  }
  showConfirm = false
  messageCreated(){
    this.showConfirm = true
  }
}
