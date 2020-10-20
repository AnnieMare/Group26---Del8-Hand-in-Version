import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { JoinOrgGroupPage } from './join-org-group.page';

describe('JoinOrgGroupPage', () => {
  let component: JoinOrgGroupPage;
  let fixture: ComponentFixture<JoinOrgGroupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JoinOrgGroupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(JoinOrgGroupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
