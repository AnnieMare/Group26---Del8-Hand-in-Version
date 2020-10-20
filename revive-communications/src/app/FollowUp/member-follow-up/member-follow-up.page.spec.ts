import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MemberFollowUpPage } from './member-follow-up.page';

describe('MemberFollowUpPage', () => {
  let component: MemberFollowUpPage;
  let fixture: ComponentFixture<MemberFollowUpPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberFollowUpPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MemberFollowUpPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
