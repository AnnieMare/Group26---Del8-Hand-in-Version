import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomecellNotesComponent } from './homecell-notes.component';

describe('HomecellNotesComponent', () => {
  let component: HomecellNotesComponent;
  let fixture: ComponentFixture<HomecellNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomecellNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomecellNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
