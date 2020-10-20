import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignedOutChildDialogComponent } from './signed-out-child-dialog.component';

describe('SignedOutChildDialogComponent', () => {
  let component: SignedOutChildDialogComponent;
  let fixture: ComponentFixture<SignedOutChildDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignedOutChildDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignedOutChildDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
