import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveAnnouncementComponent } from './remove-announcement.component';

describe('RemoveAnnouncementComponent', () => {
  let component: RemoveAnnouncementComponent;
  let fixture: ComponentFixture<RemoveAnnouncementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RemoveAnnouncementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
