import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportOnHcAttComponent } from './report-on-hc-att.component';

describe('ReportOnHcAttComponent', () => {
  let component: ReportOnHcAttComponent;
  let fixture: ComponentFixture<ReportOnHcAttComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportOnHcAttComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportOnHcAttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
