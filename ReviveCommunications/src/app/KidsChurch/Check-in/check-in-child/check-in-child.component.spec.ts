import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckInChildComponent } from './check-in-child.component';

describe('CheckInChildComponent', () => {
  let component: CheckInChildComponent;
  let fixture: ComponentFixture<CheckInChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckInChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckInChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
