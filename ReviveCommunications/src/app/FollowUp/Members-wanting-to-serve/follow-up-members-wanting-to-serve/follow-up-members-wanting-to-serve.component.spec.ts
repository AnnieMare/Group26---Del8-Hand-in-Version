import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowUpMembersWantingToServeComponent } from './follow-up-members-wanting-to-serve.component';

describe('FollowUpMembersWantingToServeComponent', () => {
  let component: FollowUpMembersWantingToServeComponent;
  let fixture: ComponentFixture<FollowUpMembersWantingToServeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowUpMembersWantingToServeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowUpMembersWantingToServeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
