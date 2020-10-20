import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetHomecellAttenGoalsComponent } from './set-homecell-atten-goals.component';

describe('SetHomecellAttenGoalsComponent', () => {
  let component: SetHomecellAttenGoalsComponent;
  let fixture: ComponentFixture<SetHomecellAttenGoalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetHomecellAttenGoalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetHomecellAttenGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
