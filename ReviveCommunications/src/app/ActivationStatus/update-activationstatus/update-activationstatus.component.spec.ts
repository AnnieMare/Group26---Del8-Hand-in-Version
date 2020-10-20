import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateActivationstatusComponent } from './update-activationstatus.component';

describe('UpdateActivationstatusComponent', () => {
  let component: UpdateActivationstatusComponent;
  let fixture: ComponentFixture<UpdateActivationstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateActivationstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateActivationstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
