import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GroupsService } from 'src/app/Services/groups.service';
import { IGroups } from 'src/app/model/groups';
import { IGroupType } from 'src/app/model/grouptype';
import { ICity } from 'src/app/model/city';
import { IProvince } from 'src/app/model/province';
import { ICountry } from 'src/app/model/country';
import { ISuburb } from 'src/app/model/suburb';
import { Router } from '@angular/router';
import { NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'app-view-group-dialog',
  templateUrl: './view-group-dialog.component.html',
  styleUrls: ['./view-group-dialog.component.scss']
})
export class ViewGroupDialogComponent implements OnInit {

  groups: IGroups[];
  grouptypes: IGroupType[];
  suburbs: ISuburb[];
  cities: ICity[];
  countries: ICountry[];
  provinces: IProvince[];
  updateGroup;
  currentGroup: any[];
  group: any;

  checked = false;

  constructor(private formbuilder: FormBuilder,
    private groupService: GroupsService,
    private router: Router,
    private sidebarService: NbSidebarService) 
    {
      this.updateGroup = this.formbuilder.group(
        {
          OrgGroupID: '',
          GroupTypeID: '',
          Description: '',
          Address: '',
          SuburbID: '',
          CityID: '',
          ProvinceID: '',
          CountryID: '',
          Size: ''
        }
      );
    }

    
  toggle() {
    this.sidebarService.toggle(true);
    return false;
  }
  
  Logout()
  {
    localStorage.removeItem("accessToken");
    this.router.navigate([""]);
  }
    ngOnInit() 
    {

      this.groupService.getGroupTypes().subscribe
      (
        gdata => 
        {
          this.grouptypes = gdata;
          console.log(gdata)
        }
      );

      this.groupService.getSuburb().subscribe
      (
        gdata => 
        {
          this.suburbs = gdata;
          console.log(gdata)
        }
      );

      this.group = this.groupService.getData();
      console.log(this.group);
      if (this.group != null)
      {
        this.updateGroup.controls.OrgGroupID.setValue(this.group.OrgGroupID);
        this.updateGroup.controls.GroupTypeID.setValue(this.group.GroupTypeID);
        this.updateGroup.controls.Description.setValue(this.group.Description);
        this.updateGroup.controls.Address.setValue(this.group.Address);
        this.updateGroup.controls.SuburbID.setValue(this.group.SuburbID);
        this.updateGroup.controls.Size.setValue(this.group.Size);      
      }
    }

    back()
  {
    
  }

}
