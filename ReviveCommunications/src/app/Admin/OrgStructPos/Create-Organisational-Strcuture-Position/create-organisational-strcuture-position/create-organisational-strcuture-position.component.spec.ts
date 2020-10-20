import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrganisationalStrcuturePositionComponent } from './create-organisational-strcuture-position.component';

describe('CreateOrganisationalStrcuturePositionComponent', () => {
  let component: CreateOrganisationalStrcuturePositionComponent;
  let fixture: ComponentFixture<CreateOrganisationalStrcuturePositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateOrganisationalStrcuturePositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrganisationalStrcuturePositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
