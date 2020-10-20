import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHomecellNotesComponent } from './add-homecell-notes.component';

describe('AddHomecellNotesComponent', () => {
  let component: AddHomecellNotesComponent;
  let fixture: ComponentFixture<AddHomecellNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddHomecellNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHomecellNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
