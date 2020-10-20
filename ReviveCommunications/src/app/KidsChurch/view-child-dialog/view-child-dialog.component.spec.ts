import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewChildDialogComponent } from './view-child-dialog.component';

describe('ViewChildDialogComponent', () => {
  let component: ViewChildDialogComponent;
  let fixture: ComponentFixture<ViewChildDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewChildDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewChildDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
