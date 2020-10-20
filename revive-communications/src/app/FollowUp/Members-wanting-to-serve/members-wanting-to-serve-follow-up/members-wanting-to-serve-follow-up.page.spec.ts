import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MembersWantingToServeFollowUpPage } from './members-wanting-to-serve-follow-up.page';

describe('MembersWantingToServeFollowUpPage', () => {
  let component: MembersWantingToServeFollowUpPage;
  let fixture: ComponentFixture<MembersWantingToServeFollowUpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembersWantingToServeFollowUpPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MembersWantingToServeFollowUpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
