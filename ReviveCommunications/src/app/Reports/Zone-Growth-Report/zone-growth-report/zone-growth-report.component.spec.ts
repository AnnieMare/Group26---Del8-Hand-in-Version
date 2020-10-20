import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneGrowthReportComponent } from './zone-growth-report.component';

describe('ZoneGrowthReportComponent', () => {
  let component: ZoneGrowthReportComponent;
  let fixture: ComponentFixture<ZoneGrowthReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoneGrowthReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoneGrowthReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
