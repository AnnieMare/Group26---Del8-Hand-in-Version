import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SalvationFormPage } from './salvation-form.page';

describe('SalvationFormPage', () => {
  let component: SalvationFormPage;
  let fixture: ComponentFixture<SalvationFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalvationFormPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SalvationFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
