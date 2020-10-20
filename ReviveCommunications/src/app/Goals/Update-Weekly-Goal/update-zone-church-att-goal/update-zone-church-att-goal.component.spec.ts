import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateZoneChurchAttGoalComponent } from './update-zone-church-att-goal.component';

describe('UpdateZoneChurchAttGoalComponent', () => {
  let component: UpdateZoneChurchAttGoalComponent;
  let fixture: ComponentFixture<UpdateZoneChurchAttGoalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateZoneChurchAttGoalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateZoneChurchAttGoalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
