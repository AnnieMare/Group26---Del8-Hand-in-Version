import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateZoneHomecellAttGoalComponent } from './update-zone-homecell-att-goal.component';

describe('UpdateZoneHomecellAttGoalComponent', () => {
  let component: UpdateZoneHomecellAttGoalComponent;
  let fixture: ComponentFixture<UpdateZoneHomecellAttGoalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateZoneHomecellAttGoalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateZoneHomecellAttGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
