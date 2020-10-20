import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewDiscipleshipPage } from './view-discipleship.page';

describe('ViewDiscipleshipPage', () => {
  let component: ViewDiscipleshipPage;
  let fixture: ComponentFixture<ViewDiscipleshipPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDiscipleshipPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewDiscipleshipPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
