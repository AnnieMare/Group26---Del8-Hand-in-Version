import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerChildrenComponent } from './volunteer-children.component';

describe('VolunteerChildrenComponent', () => {
  let component: VolunteerChildrenComponent;
  let fixture: ComponentFixture<VolunteerChildrenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolunteerChildrenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteerChildrenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
