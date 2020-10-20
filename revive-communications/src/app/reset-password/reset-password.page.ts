import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {

  constructor(private alertCtrl: AlertController) { }

  ngOnInit() {
  }
  openOTP() {
    document.getElementById("OTP").style.display = "block";
  }
  async reset() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Reset Password',
      inputs: [
        {
          name: 'Password',
          type: 'password',
          placeholder: 'New Password'
          
        },
        {
          name: 'PasswordConfirm',
          type: 'password',
          placeholder: 'Confirm New Password'
        },
        
      ],
      
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Reset',
          handler: () => {
            this.openOTP();
          }
        }
      ]
    });

    await alert.present();
  }
}
