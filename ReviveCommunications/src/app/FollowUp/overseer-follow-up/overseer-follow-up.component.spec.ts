import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverseerFollowUpComponent } from './overseer-follow-up.component';

describe('OverseerFollowUpComponent', () => {
  let component: OverseerFollowUpComponent;
  let fixture: ComponentFixture<OverseerFollowUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverseerFollowUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverseerFollowUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
