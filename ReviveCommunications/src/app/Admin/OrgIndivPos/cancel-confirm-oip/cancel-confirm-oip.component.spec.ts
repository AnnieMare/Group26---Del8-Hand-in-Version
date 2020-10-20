import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelConfirmOIPComponent } from './cancel-confirm-oip.component';

describe('CancelConfirmOIPComponent', () => {
  let component: CancelConfirmOIPComponent;
  let fixture: ComponentFixture<CancelConfirmOIPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelConfirmOIPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelConfirmOIPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
