import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StructureGrowthFeedbackPage } from './structure-growth-feedback.page';

describe('StructureGrowthFeedbackPage', () => {
  let component: StructureGrowthFeedbackPage;
  let fixture: ComponentFixture<StructureGrowthFeedbackPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructureGrowthFeedbackPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StructureGrowthFeedbackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
