import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReportChurchAttPage } from './report-church-att.page';

describe('ReportChurchAttPage', () => {
  let component: ReportChurchAttPage;
  let fixture: ComponentFixture<ReportChurchAttPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportChurchAttPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportChurchAttPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
