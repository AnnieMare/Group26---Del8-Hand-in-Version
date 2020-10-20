import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateGroupTypeComponent } from './update-group-type.component';

describe('UpdateGroupTypeComponent', () => {
  let component: UpdateGroupTypeComponent;
  let fixture: ComponentFixture<UpdateGroupTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateGroupTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateGroupTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
