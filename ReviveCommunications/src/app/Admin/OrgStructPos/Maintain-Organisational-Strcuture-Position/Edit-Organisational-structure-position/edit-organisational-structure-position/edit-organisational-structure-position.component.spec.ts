import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOrganisationalStructurePositionComponent } from './edit-organisational-structure-position.component';

describe('EditOrganisationalStructurePositionComponent', () => {
  let component: EditOrganisationalStructurePositionComponent;
  let fixture: ComponentFixture<EditOrganisationalStructurePositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOrganisationalStructurePositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOrganisationalStructurePositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
