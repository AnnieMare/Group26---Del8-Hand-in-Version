import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetZoneChurchAttenGoalsComponent } from './set-zone-church-atten-goals.component';

describe('SetZoneChurchAttenGoalsComponent', () => {
  let component: SetZoneChurchAttenGoalsComponent;
  let fixture: ComponentFixture<SetZoneChurchAttenGoalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetZoneChurchAttenGoalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetZoneChurchAttenGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
