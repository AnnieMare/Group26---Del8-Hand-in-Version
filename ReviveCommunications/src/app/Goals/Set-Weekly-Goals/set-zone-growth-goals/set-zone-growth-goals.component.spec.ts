import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetZoneGrowthGoalsComponent } from './set-zone-growth-goals.component';

describe('SetZoneGrowthGoalsComponent', () => {
  let component: SetZoneGrowthGoalsComponent;
  let fixture: ComponentFixture<SetZoneGrowthGoalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetZoneGrowthGoalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetZoneGrowthGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
