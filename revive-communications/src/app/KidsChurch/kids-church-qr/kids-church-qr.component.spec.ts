import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KidsChurchQRComponent } from './kids-church-qr.component';

describe('KidsChurchQRComponent', () => {
  let component: KidsChurchQRComponent;
  let fixture: ComponentFixture<KidsChurchQRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KidsChurchQRComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KidsChurchQRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
