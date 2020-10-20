import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchDiscipleshipComponent } from './search-discipleship.component';

describe('SearchDiscipleshipComponent', () => {
  let component: SearchDiscipleshipComponent;
  let fixture: ComponentFixture<SearchDiscipleshipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchDiscipleshipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchDiscipleshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
