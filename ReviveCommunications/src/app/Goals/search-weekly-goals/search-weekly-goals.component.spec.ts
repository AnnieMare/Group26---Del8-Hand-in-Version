import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchWeeklyGoalsComponent } from './search-weekly-goals.component';

describe('SearchWeeklyGoalsComponent', () => {
  let component: SearchWeeklyGoalsComponent;
  let fixture: ComponentFixture<SearchWeeklyGoalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchWeeklyGoalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchWeeklyGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
