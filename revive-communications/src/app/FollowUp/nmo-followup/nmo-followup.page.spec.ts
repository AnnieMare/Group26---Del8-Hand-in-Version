import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NmoFollowupPage } from './nmo-followup.page';

describe('NmoFollowupPage', () => {
  let component: NmoFollowupPage;
  let fixture: ComponentFixture<NmoFollowupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NmoFollowupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NmoFollowupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
