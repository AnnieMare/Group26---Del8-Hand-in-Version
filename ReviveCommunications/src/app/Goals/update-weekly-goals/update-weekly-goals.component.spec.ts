import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateWeeklyGoalsComponent } from './update-weekly-goals.component';

describe('UpdateWeeklyGoalsComponent', () => {
  let component: UpdateWeeklyGoalsComponent;
  let fixture: ComponentFixture<UpdateWeeklyGoalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateWeeklyGoalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateWeeklyGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
