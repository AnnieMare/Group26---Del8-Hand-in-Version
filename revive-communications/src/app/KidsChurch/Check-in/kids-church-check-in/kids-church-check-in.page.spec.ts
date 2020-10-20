import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { KidsChurchCheckInPage } from './kids-church-check-in.page';

describe('KidsChurchCheckInPage', () => {
  let component: KidsChurchCheckInPage;
  let fixture: ComponentFixture<KidsChurchCheckInPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KidsChurchCheckInPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(KidsChurchCheckInPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
