import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QRKidschurchPage } from './qrkidschurch.page';

describe('QRKidschurchPage', () => {
  let component: QRKidschurchPage;
  let fixture: ComponentFixture<QRKidschurchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QRKidschurchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(QRKidschurchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
