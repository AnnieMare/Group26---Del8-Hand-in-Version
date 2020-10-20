import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaderFollowUpComponent } from './leader-follow-up.component';

describe('LeaderFollowUpComponent', () => {
  let component: LeaderFollowUpComponent;
  let fixture: ComponentFixture<LeaderFollowUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaderFollowUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaderFollowUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
