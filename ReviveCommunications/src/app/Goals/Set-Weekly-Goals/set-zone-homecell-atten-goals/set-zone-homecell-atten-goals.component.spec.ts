import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetZoneHomecellAttenGoalsComponent } from './set-zone-homecell-atten-goals.component';

describe('SetZoneHomecellAttenGoalsComponent', () => {
  let component: SetZoneHomecellAttenGoalsComponent;
  let fixture: ComponentFixture<SetZoneHomecellAttenGoalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetZoneHomecellAttenGoalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetZoneHomecellAttenGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
