import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchPersonPage } from './search-person.page';

describe('SearchPersonPage', () => {
  let component: SearchPersonPage;
  let fixture: ComponentFixture<SearchPersonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPersonPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchPersonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
