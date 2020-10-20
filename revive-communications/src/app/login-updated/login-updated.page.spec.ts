import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoginUpdatedPage } from './login-updated.page';

describe('LoginUpdatedPage', () => {
  let component: LoginUpdatedPage;
  let fixture: ComponentFixture<LoginUpdatedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginUpdatedPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginUpdatedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
