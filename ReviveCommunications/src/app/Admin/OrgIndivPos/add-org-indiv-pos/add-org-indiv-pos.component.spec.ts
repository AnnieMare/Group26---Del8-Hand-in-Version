import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrgIndivPosComponent } from './add-org-indiv-pos.component';

describe('AddOrgIndivPosComponent', () => {
  let component: AddOrgIndivPosComponent;
  let fixture: ComponentFixture<AddOrgIndivPosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrgIndivPosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrgIndivPosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
