import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteOIPDialogComponent } from './confirm-delete-oipdialog.component';

describe('ConfirmDeleteOIPDialogComponent', () => {
  let component: ConfirmDeleteOIPDialogComponent;
  let fixture: ComponentFixture<ConfirmDeleteOIPDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmDeleteOIPDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDeleteOIPDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
