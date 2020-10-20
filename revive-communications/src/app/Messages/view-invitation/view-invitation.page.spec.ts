import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewInvitationPage } from './view-invitation.page';

describe('ViewInvitationPage', () => {
  let component: ViewInvitationPage;
  let fixture: ComponentFixture<ViewInvitationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewInvitationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewInvitationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
