import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LeaderFollowUpPage } from './leader-follow-up.page';

describe('LeaderFollowUpPage', () => {
  let component: LeaderFollowUpPage;
  let fixture: ComponentFixture<LeaderFollowUpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeaderFollowUpPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LeaderFollowUpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
