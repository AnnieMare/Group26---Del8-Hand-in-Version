import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpdateWeeklyGoalsPage } from './update-weekly-goals.page';

describe('UpdateWeeklyGoalsPage', () => {
  let component: UpdateWeeklyGoalsPage;
  let fixture: ComponentFixture<UpdateWeeklyGoalsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateWeeklyGoalsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateWeeklyGoalsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
