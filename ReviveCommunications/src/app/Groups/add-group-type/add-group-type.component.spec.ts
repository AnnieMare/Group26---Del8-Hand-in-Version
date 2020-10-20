import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGroupTypeComponent } from './add-group-type.component';

describe('AddGroupTypeComponent', () => {
  let component: AddGroupTypeComponent;
  let fixture: ComponentFixture<AddGroupTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGroupTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGroupTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
