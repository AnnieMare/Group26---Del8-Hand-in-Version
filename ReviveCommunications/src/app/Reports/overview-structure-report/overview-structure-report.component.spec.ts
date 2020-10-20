import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverviewStructureReportComponent } from './overview-structure-report.component';

describe('OverviewStructureReportComponent', () => {
  let component: OverviewStructureReportComponent;
  let fixture: ComponentFixture<OverviewStructureReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewStructureReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewStructureReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
