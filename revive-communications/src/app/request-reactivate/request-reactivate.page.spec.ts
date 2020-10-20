import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RequestReactivatePage } from './request-reactivate.page';

describe('RequestReactivatePage', () => {
  let component: RequestReactivatePage;
  let fixture: ComponentFixture<RequestReactivatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestReactivatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RequestReactivatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
