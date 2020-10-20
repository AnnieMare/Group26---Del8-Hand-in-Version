import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetDiscipleshipGoalsComponent } from './set-discipleship-goals.component';

describe('SetDiscipleshipGoalsComponent', () => {
  let component: SetDiscipleshipGoalsComponent;
  let fixture: ComponentFixture<SetDiscipleshipGoalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetDiscipleshipGoalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetDiscipleshipGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
