import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignOrganisationalStrcuturePositionComponent } from './assign-organisational-strcuture-position.component';

describe('AssignOrganisationalStrcuturePositionComponent', () => {
  let component: AssignOrganisationalStrcuturePositionComponent;
  let fixture: ComponentFixture<AssignOrganisationalStrcuturePositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignOrganisationalStrcuturePositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignOrganisationalStrcuturePositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
