import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SendInvitationPage } from './send-invitation.page';

describe('SendInvitationPage', () => {
  let component: SendInvitationPage;
  let fixture: ComponentFixture<SendInvitationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendInvitationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SendInvitationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
