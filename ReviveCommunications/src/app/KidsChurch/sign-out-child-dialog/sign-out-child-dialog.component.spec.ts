import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignOutChildDialogComponent } from './sign-out-child-dialog.component';

describe('SignOutChildDialogComponent', () => {
  let component: SignOutChildDialogComponent;
  let fixture: ComponentFixture<SignOutChildDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignOutChildDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignOutChildDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
