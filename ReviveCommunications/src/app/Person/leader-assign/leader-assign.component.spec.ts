import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderAssignComponent } from './leader-assign.component';

describe('LeaderAssignComponent', () => {
  let component: LeaderAssignComponent;
  let fixture: ComponentFixture<LeaderAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaderAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
