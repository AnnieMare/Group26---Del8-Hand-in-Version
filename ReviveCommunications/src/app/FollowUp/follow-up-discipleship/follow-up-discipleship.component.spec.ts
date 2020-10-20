import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowUpDiscipleshipComponent } from './follow-up-discipleship.component';

describe('FollowUpDiscipleshipComponent', () => {
  let component: FollowUpDiscipleshipComponent;
  let fixture: ComponentFixture<FollowUpDiscipleshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowUpDiscipleshipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowUpDiscipleshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
