import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetNMOGoalsComponent } from './set-nmo-goals.component';

describe('SetNMOGoalsComponent', () => {
  let component: SetNMOGoalsComponent;
  let fixture: ComponentFixture<SetNMOGoalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetNMOGoalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetNMOGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
