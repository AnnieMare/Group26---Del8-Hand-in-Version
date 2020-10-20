import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReportDiscipleshipPage } from './report-discipleship.page';

describe('ReportDiscipleshipPage', () => {
  let component: ReportDiscipleshipPage;
  let fixture: ComponentFixture<ReportDiscipleshipPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportDiscipleshipPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportDiscipleshipPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
