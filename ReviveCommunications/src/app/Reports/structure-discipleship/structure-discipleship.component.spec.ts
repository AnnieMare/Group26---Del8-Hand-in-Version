import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructureDiscipleshipComponent } from './structure-discipleship.component';

describe('StructureDiscipleshipComponent', () => {
  let component: StructureDiscipleshipComponent;
  let fixture: ComponentFixture<StructureDiscipleshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructureDiscipleshipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructureDiscipleshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
