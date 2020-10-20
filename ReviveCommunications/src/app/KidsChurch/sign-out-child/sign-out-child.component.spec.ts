import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignOutChildComponent } from './sign-out-child.component';

describe('SignOutChildComponent', () => {
  let component: SignOutChildComponent;
  let fixture: ComponentFixture<SignOutChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignOutChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignOutChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
