import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowUpSalvationComponent } from './follow-up-salvation.component';

describe('FollowUpSalvationComponent', () => {
  let component: FollowUpSalvationComponent;
  let fixture: ComponentFixture<FollowUpSalvationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowUpSalvationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowUpSalvationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
