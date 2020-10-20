import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintainOrgIndivPosComponent } from './maintain-org-indiv-pos.component';

describe('MaintainOrgIndivPosComponent', () => {
  let component: MaintainOrgIndivPosComponent;
  let fixture: ComponentFixture<MaintainOrgIndivPosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintainOrgIndivPosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintainOrgIndivPosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
