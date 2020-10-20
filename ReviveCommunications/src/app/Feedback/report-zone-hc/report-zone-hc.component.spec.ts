import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportZoneHcComponent } from './report-zone-hc.component';

describe('ReportZoneHcComponent', () => {
  let component: ReportZoneHcComponent;
  let fixture: ComponentFixture<ReportZoneHcComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportZoneHcComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportZoneHcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
