import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStructureGrowthGoalComponent } from './update-structure-growth-goal.component';

describe('UpdateStructureGrowthGoalComponent', () => {
  let component: UpdateStructureGrowthGoalComponent;
  let fixture: ComponentFixture<UpdateStructureGrowthGoalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateStructureGrowthGoalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateStructureGrowthGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
