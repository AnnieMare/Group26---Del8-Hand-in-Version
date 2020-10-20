import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDiscipleshipGoalComponent } from './update-discipleship-goal.component';

describe('UpdateDiscipleshipGoalComponent', () => {
  let component: UpdateDiscipleshipGoalComponent;
  let fixture: ComponentFixture<UpdateDiscipleshipGoalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDiscipleshipGoalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDiscipleshipGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
