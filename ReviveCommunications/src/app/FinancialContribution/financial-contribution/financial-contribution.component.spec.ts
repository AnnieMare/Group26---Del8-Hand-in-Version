import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancialContributionComponent } from './financial-contribution.component';

describe('FinancialContributionComponent', () => {
  let component: FinancialContributionComponent;
  let fixture: ComponentFixture<FinancialContributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancialContributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialContributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
