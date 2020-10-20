import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportDiscComponent } from './report-disc.component';

describe('ReportDiscComponent', () => {
  let component: ReportDiscComponent;
  let fixture: ComponentFixture<ReportDiscComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportDiscComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportDiscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
