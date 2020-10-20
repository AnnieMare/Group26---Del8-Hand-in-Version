import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { KidsChurchService } from 'src/app/Services/kids-church.service';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-register-child',
  templateUrl: './register-child.page.html',
  styleUrls: ['./register-child.page.scss'],
})
export class RegisterChildPage implements OnInit {

  Person:any;
  session:any;
  myChildren: any;
radioSelected;
selecedclass
selectedClass;
selected
class
KidsChurchClasses: any[];
checkbox1;
radioSelectedString
SelectedClassString
ChildSel
ClassSel
  constructor(
    
    private service : KidsChurchService,
    private router: Router,
    private loginService: LoginService,
    private toastrService: ToastController, 
  ) { }


  Logout()
  {
    localStorage.removeItem("accessToken");
    this.router.navigate([""]);
  }

  ngOnInit() {


    if(!localStorage.getItem("accessToken")){
        this.router.navigate(['']);
      }
      else{
        this.session ={"SessionID": localStorage.getItem("accessToken")}
        this.loginService.getUserDetails(this.session).subscribe(res =>{
          this.Person = res;
          console.log(this.Person)
           
      this.service.getMyChildren(this.Person).subscribe(x =>{
        console.log(x)
        this.myChildren = x;
      })
        })
      }
 
  
      this.service.getKidsChurchClasses().subscribe(x => {
        console.log(x);
        this.KidsChurchClasses = x;
      })
    }
  
onClassChange(k){
  this.class= k;
  this.getSelectedclass();

}
getSelectedclass(){
  this.class = this.KidsChurchClasses.find(Item => Item.value === this.selectedClass);
  console.log(this.class)
  this.SelectedClassString = JSON.stringify(this.ClassSel);
}

onItemChange(c){
  this.selected = c;
  this.getSelecteditem();

}
getSelecteditem(){
  this.selected = this.myChildren.find(Item => Item.value === this.radioSelected);
  console.log(this.selected)
  this.radioSelectedString = JSON.stringify(this.ChildSel);
}

  checked = false;

  select(checked: boolean) {
    this.checked = checked;
  }

  onSubmit(registerInfo){
    console.log(registerInfo)

    this.service.register(registerInfo).subscribe(x =>{
      this.presentToast()
      this.router.navigate(['/register-child']);
    })

  }

  showClass = false
  childSelected(){
    this.showClass = true
  }
  showConfirm = false
  classSelected(){
    this.showConfirm = true
  }

  async presentToast() {
    const toast = await this.toastrService.create({
      message: 'Child Registered successfully.',
      duration: 2000
    });
    toast.present();
  }

}
