import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NmoFollowUpComponent } from './nmo-follow-up.component';

describe('NmoFollowUpComponent', () => {
  let component: NmoFollowUpComponent;
  let fixture: ComponentFixture<NmoFollowUpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NmoFollowUpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NmoFollowUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
