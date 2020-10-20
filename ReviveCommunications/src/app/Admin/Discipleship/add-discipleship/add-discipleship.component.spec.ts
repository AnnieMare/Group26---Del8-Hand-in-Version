import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDiscipleshipComponent } from './add-discipleship.component';

describe('AddDiscipleshipComponent', () => {
  let component: AddDiscipleshipComponent;
  let fixture: ComponentFixture<AddDiscipleshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddDiscipleshipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddDiscipleshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
