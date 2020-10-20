import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetWeeklyGoalComponent } from './set-weekly-goal.component';

describe('SetWeeklyGoalComponent', () => {
  let component: SetWeeklyGoalComponent;
  let fixture: ComponentFixture<SetWeeklyGoalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetWeeklyGoalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetWeeklyGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
