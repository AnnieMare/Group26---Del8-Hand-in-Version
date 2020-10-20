import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowUpMemberComponent } from './follow-up-member.component';

describe('FollowUpMemberComponent', () => {
  let component: FollowUpMemberComponent;
  let fixture: ComponentFixture<FollowUpMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowUpMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowUpMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
