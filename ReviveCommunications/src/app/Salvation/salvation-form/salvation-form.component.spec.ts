import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalvationFormComponent } from './salvation-form.component';

describe('SalvationFormComponent', () => {
  let component: SalvationFormComponent;
  let fixture: ComponentFixture<SalvationFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalvationFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalvationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
