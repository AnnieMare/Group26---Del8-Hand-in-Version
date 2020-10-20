import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { KidsChurchService } from 'src/app/Services/kids-church.service'; 
import { IKidsChurch } from 'src/app/model/kidschurch';
import { IPersonChild } from 'src/app/model/personChild';

@Component({
  selector: 'app-view-child-dialog',
  templateUrl: './view-child-dialog.component.html',
  styleUrls: ['./view-child-dialog.component.scss']
})
export class ViewChildDialogComponent implements OnInit {

  updateChild;
  kidschurches: IKidsChurch[];
  kidschurchchild: IPersonChild[];
  child: any;

  constructor(private formbuilder: FormBuilder,
              private kidsChurchService: KidsChurchService) 
              {
                this.updateChild = this.formbuilder.group(
                  {
                    ChildID: '',
                    Name: '',
                    Surname: '',
                    DateOfBirth: '',
                    KidsChurchID: ''
                  }
                );
              }

  ngOnInit() 
  {
    this.child = this.kidsChurchService.getData();
    //console.log(this.child.ChildName);
    if (this.child != null)
    {
      this.updateChild.controls.ChildID.setValue(this.child.ChildID);
      this.updateChild.controls.Name.setValue(this.child.Name);
      this.updateChild.controls.Surname.setValue(this.child.Surname);
      this.updateChild.controls.DateOfBirth.setValue(this.child.DateOfBirth);     
    }
  }

}
