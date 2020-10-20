import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportStructureGrowthComponent } from './report-structure-growth.component';

describe('ReportStructureGrowthComponent', () => {
  let component: ReportStructureGrowthComponent;
  let fixture: ComponentFixture<ReportStructureGrowthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportStructureGrowthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportStructureGrowthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
