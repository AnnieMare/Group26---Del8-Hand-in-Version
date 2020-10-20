import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintainOrganisationalStrcuturePositionComponent } from './maintain-organisational-strcuture-position.component';

describe('MaintainOrganisationalStrcuturePositionComponent', () => {
  let component: MaintainOrganisationalStrcuturePositionComponent;
  let fixture: ComponentFixture<MaintainOrganisationalStrcuturePositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintainOrganisationalStrcuturePositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintainOrganisationalStrcuturePositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
