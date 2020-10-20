import { Component, OnInit } from '@angular/core';
import { HomecellNotesService } from 'src/app/Services/homecell-notes-service.service';

@Component({
  selector: 'app-homecell-notes',
  templateUrl: './homecell-notes.page.html',
  styleUrls: ['./homecell-notes.page.scss'],
})
export class HomecellNotesPage implements OnInit {
  filter: boolean;
  HomecellNotesDropDown: any;
  homecellNotes: any;
  searchEnable: boolean;
  constructor(private HCNotesServices: HomecellNotesService){}//, private db: AngularFireDatabase, private document: DocumentViewer,
   // private videoPlayer: VideoPlayer) { }

  ngOnInit() {
    this.filter = false;
    this.HCNotesServices.getHomecellNotes().subscribe(data=>{
      console.log(data);
      this.homecellNotes = data;
      this.HomecellNotesDropDown = data;
      this.searchEnable = true;
    });
  }

  SearchHCNotes(form) { 
    console.log(form)
      this.HCNotesServices.HomecellNotesByID(form.value).subscribe(x=>{
        this.homecellNotes = x;
        this.filter = false;
        this.searchEnable = true;
      })
  }
  
  Filter(){
    if(this.filter == false)
    {
      this.filter = true;
    }
    else{
      this.filter = false;
    }

}}
