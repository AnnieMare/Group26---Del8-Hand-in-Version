import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddDiscipleshipPage } from './add-discipleship.page';

describe('AddDiscipleshipPage', () => {
  let component: AddDiscipleshipPage;
  let fixture: ComponentFixture<AddDiscipleshipPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDiscipleshipPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddDiscipleshipPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
