import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RegisterChildPage } from './register-child.page';

describe('RegisterChildPage', () => {
  let component: RegisterChildPage;
  let fixture: ComponentFixture<RegisterChildPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterChildPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterChildPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
