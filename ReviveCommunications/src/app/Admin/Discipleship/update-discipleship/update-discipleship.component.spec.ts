import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateDiscipleshipComponent } from './update-discipleship.component';

describe('UpdateDiscipleshipComponent', () => {
  let component: UpdateDiscipleshipComponent;
  let fixture: ComponentFixture<UpdateDiscipleshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateDiscipleshipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateDiscipleshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
