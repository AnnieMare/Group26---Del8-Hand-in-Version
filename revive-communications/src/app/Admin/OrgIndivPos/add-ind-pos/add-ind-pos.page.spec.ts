import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddIndPosPage } from './add-ind-pos.page';

describe('AddIndPosPage', () => {
  let component: AddIndPosPage;
  let fixture: ComponentFixture<AddIndPosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddIndPosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddIndPosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
