import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SalvationFollowupPage } from './salvation-followup.page';

describe('SalvationFollowupPage', () => {
  let component: SalvationFollowupPage;
  let fixture: ComponentFixture<SalvationFollowupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalvationFollowupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SalvationFollowupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
