import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RequestDeactivatePage } from './request-deactivate.page';

describe('RequestDeactivatePage', () => {
  let component: RequestDeactivatePage;
  let fixture: ComponentFixture<RequestDeactivatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestDeactivatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RequestDeactivatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
