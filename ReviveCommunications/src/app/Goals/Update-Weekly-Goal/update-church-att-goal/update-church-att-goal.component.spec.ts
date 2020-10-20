import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateChurchAttGoalComponent } from './update-church-att-goal.component';

describe('UpdateChurchAttGoalComponent', () => {
  let component: UpdateChurchAttGoalComponent;
  let fixture: ComponentFixture<UpdateChurchAttGoalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateChurchAttGoalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateChurchAttGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
