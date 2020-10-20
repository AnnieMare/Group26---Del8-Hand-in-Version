import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetStructureGrowthGoalsComponent } from './set-structure-growth-goals.component';

describe('SetStructureGrowthGoalsComponent', () => {
  let component: SetStructureGrowthGoalsComponent;
  let fixture: ComponentFixture<SetStructureGrowthGoalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetStructureGrowthGoalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetStructureGrowthGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
