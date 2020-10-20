import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DiscipleshipFollowupPage } from './discipleship-followup.page';

describe('DiscipleshipFollowupPage', () => {
  let component: DiscipleshipFollowupPage;
  let fixture: ComponentFixture<DiscipleshipFollowupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiscipleshipFollowupPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DiscipleshipFollowupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
