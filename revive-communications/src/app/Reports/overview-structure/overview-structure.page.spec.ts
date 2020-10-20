import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OverviewStructurePage } from './overview-structure.page';

describe('OverviewStructurePage', () => {
  let component: OverviewStructurePage;
  let fixture: ComponentFixture<OverviewStructurePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverviewStructurePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OverviewStructurePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
