import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateZoneGrowthGoalComponent } from './update-zone-growth-goal.component';

describe('UpdateZoneGrowthGoalComponent', () => {
  let component: UpdateZoneGrowthGoalComponent;
  let fixture: ComponentFixture<UpdateZoneGrowthGoalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateZoneGrowthGoalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateZoneGrowthGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
