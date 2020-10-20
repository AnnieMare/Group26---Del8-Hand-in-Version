import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewIndPosPage } from './view-ind-pos.page';

describe('ViewIndPosPage', () => {
  let component: ViewIndPosPage;
  let fixture: ComponentFixture<ViewIndPosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewIndPosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewIndPosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
