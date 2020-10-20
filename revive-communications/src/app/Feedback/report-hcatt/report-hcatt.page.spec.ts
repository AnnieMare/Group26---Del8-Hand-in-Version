import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReportHCAttPage } from './report-hcatt.page';

describe('ReportHCAttPage', () => {
  let component: ReportHCAttPage;
  let fixture: ComponentFixture<ReportHCAttPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportHCAttPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportHCAttPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
