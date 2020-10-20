import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerSignOutApproveComponent } from './volunteer-sign-out-approve.component';

describe('VolunteerSignOutApproveComponent', () => {
  let component: VolunteerSignOutApproveComponent;
  let fixture: ComponentFixture<VolunteerSignOutApproveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolunteerSignOutApproveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteerSignOutApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
