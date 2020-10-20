import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportZoneGrowthComponent } from './report-zone-growth.component';

describe('ReportZoneGrowthComponent', () => {
  let component: ReportZoneGrowthComponent;
  let fixture: ComponentFixture<ReportZoneGrowthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportZoneGrowthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportZoneGrowthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
