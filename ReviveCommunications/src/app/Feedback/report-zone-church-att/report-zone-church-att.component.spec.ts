import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportZoneChurchAttComponent } from './report-zone-church-att.component';

describe('ReportZoneChurchAttComponent', () => {
  let component: ReportZoneChurchAttComponent;
  let fixture: ComponentFixture<ReportZoneChurchAttComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportZoneChurchAttComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportZoneChurchAttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
