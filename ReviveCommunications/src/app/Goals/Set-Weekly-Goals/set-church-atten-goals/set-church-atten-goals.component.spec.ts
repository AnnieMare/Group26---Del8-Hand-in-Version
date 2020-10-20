import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetChurchAttenGoalsComponent } from './set-church-atten-goals.component';

describe('SetChurchAttenGoalsComponent', () => {
  let component: SetChurchAttenGoalsComponent;
  let fixture: ComponentFixture<SetChurchAttenGoalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetChurchAttenGoalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetChurchAttenGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
