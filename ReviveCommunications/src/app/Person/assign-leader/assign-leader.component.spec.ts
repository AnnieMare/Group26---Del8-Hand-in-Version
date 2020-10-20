import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignLeaderComponent } from './assign-leader.component';

describe('AssignLeaderComponent', () => {
  let component: AssignLeaderComponent;
  let fixture: ComponentFixture<AssignLeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignLeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignLeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
