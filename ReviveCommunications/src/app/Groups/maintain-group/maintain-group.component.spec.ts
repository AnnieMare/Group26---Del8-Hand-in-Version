import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintainGroupComponent } from './maintain-group.component';

describe('MaintainGroupComponent', () => {
  let component: MaintainGroupComponent;
  let fixture: ComponentFixture<MaintainGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaintainGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaintainGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
