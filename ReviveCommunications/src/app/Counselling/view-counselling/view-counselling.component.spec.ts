import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCounsellingComponent } from './view-counselling.component';

describe('ViewCounsellingComponent', () => {
  let component: ViewCounsellingComponent;
  let fixture: ComponentFixture<ViewCounsellingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCounsellingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCounsellingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
