import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ZoneGrowthPage } from './zone-growth.page';

describe('ZoneGrowthPage', () => {
  let component: ZoneGrowthPage;
  let fixture: ComponentFixture<ZoneGrowthPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoneGrowthPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ZoneGrowthPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
