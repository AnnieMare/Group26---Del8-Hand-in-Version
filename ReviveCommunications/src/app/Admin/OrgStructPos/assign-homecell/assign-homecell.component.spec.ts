import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignHomecellComponent } from './assign-homecell.component';

describe('AssignHomecellComponent', () => {
  let component: AssignHomecellComponent;
  let fixture: ComponentFixture<AssignHomecellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignHomecellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignHomecellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
