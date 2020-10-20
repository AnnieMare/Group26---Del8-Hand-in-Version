import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalvationViewComponent } from './salvation-view.component';

describe('SalvationViewComponent', () => {
  let component: SalvationViewComponent;
  let fixture: ComponentFixture<SalvationViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalvationViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalvationViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
