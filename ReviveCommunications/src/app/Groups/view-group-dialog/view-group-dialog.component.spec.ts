import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewGroupDialogComponent } from './view-group-dialog.component';

describe('ViewGroupDialogComponent', () => {
  let component: ViewGroupDialogComponent;
  let fixture: ComponentFixture<ViewGroupDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewGroupDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewGroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
