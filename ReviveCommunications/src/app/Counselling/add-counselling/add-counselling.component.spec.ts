import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCounsellingComponent } from './add-counselling.component';

describe('AddCounsellingComponent', () => {
  let component: AddCounsellingComponent;
  let fixture: ComponentFixture<AddCounsellingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCounsellingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCounsellingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
