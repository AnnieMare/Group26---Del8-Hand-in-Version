import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SetWeeklyGoalsPage } from './set-weekly-goals.page';

describe('SetWeeklyGoalsPage', () => {
  let component: SetWeeklyGoalsPage;
  let fixture: ComponentFixture<SetWeeklyGoalsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetWeeklyGoalsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SetWeeklyGoalsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
