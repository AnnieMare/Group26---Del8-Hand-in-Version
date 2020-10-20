import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCounsellingRequestComponent } from './view-counselling-request.component';

describe('ViewCounsellingRequestComponent', () => {
  let component: ViewCounsellingRequestComponent;
  let fixture: ComponentFixture<ViewCounsellingRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCounsellingRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCounsellingRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
