import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrganisationalStrcuturePositionComponent } from './view-organisational-strcuture-position.component';

describe('ViewOrganisationalStrcuturePositionComponent', () => {
  let component: ViewOrganisationalStrcuturePositionComponent;
  let fixture: ComponentFixture<ViewOrganisationalStrcuturePositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOrganisationalStrcuturePositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOrganisationalStrcuturePositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
