import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganisationalStructurePositionAssignComponent } from './organisational-structure-position-assign.component';

describe('OrganisationalStructurePositionAssignComponent', () => {
  let component: OrganisationalStructurePositionAssignComponent;
  let fixture: ComponentFixture<OrganisationalStructurePositionAssignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrganisationalStructurePositionAssignComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganisationalStructurePositionAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
