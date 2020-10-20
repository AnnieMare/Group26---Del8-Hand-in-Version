import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchWeeklyGoalsPage } from './search-weekly-goals.page';

describe('SearchWeeklyGoalsPage', () => {
  let component: SearchWeeklyGoalsPage;
  let fixture: ComponentFixture<SearchWeeklyGoalsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchWeeklyGoalsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchWeeklyGoalsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
