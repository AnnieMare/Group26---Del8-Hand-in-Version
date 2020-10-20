import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCounsellingViewComponent } from './new-counselling-view.component';

describe('NewCounsellingViewComponent', () => {
  let component: NewCounsellingViewComponent;
  let fixture: ComponentFixture<NewCounsellingViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCounsellingViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCounsellingViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
