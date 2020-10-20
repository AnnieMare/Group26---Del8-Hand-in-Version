import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGroupTypeComponent } from './view-group-type.component';

describe('ViewGroupTypeComponent', () => {
  let component: ViewGroupTypeComponent;
  let fixture: ComponentFixture<ViewGroupTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewGroupTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGroupTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
