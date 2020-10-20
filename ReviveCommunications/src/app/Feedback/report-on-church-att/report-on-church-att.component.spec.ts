import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportOnChurchAttComponent } from './report-on-church-att.component';

describe('ReportOnChurchAttComponent', () => {
  let component: ReportOnChurchAttComponent;
  let fixture: ComponentFixture<ReportOnChurchAttComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportOnChurchAttComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportOnChurchAttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
