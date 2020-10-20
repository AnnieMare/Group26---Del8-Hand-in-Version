import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpdateIndPosPage } from './update-ind-pos.page';

describe('UpdateIndPosPage', () => {
  let component: UpdateIndPosPage;
  let fixture: ComponentFixture<UpdateIndPosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateIndPosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateIndPosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
