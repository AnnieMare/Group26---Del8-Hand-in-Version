import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NMOReportComponent } from './nmoreport.component';

describe('NMOReportComponent', () => {
  let component: NMOReportComponent;
  let fixture: ComponentFixture<NMOReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NMOReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NMOReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
