import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateHomecellAttGoalComponent } from './update-homecell-att-goal.component';

describe('UpdateHomecellAttGoalComponent', () => {
  let component: UpdateHomecellAttGoalComponent;
  let fixture: ComponentFixture<UpdateHomecellAttGoalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateHomecellAttGoalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateHomecellAttGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
