import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignOrganisationalGroupsComponent } from './assign-organisational-groups.component';

describe('AssignOrganisationalGroupsComponent', () => {
  let component: AssignOrganisationalGroupsComponent;
  let fixture: ComponentFixture<AssignOrganisationalGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignOrganisationalGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignOrganisationalGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
