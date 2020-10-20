import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOrgIndivPosComponent } from './view-org-indiv-pos.component';

describe('ViewOrgIndivPosComponent', () => {
  let component: ViewOrgIndivPosComponent;
  let fixture: ComponentFixture<ViewOrgIndivPosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewOrgIndivPosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewOrgIndivPosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
