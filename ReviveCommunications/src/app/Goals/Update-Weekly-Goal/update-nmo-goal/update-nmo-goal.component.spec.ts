import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateNMOGoalComponent } from './update-nmo-goal.component';

describe('UpdateNMOGoalComponent', () => {
  let component: UpdateNMOGoalComponent;
  let fixture: ComponentFixture<UpdateNMOGoalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateNMOGoalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateNMOGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
