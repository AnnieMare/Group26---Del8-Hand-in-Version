import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelConfirmDiscipleshipComponent } from './cancel-confirm-discipleship.component';

describe('CancelConfirmDiscipleshipComponent', () => {
  let component: CancelConfirmDiscipleshipComponent;
  let fixture: ComponentFixture<CancelConfirmDiscipleshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelConfirmDiscipleshipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelConfirmDiscipleshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
