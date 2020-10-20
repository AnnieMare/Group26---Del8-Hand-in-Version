import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OverseerFollowUpPage } from './overseer-follow-up.page';

describe('OverseerFollowUpPage', () => {
  let component: OverseerFollowUpPage;
  let fixture: ComponentFixture<OverseerFollowUpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverseerFollowUpPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OverseerFollowUpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
