import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomecellNotesPage } from './homecell-notes.page';

describe('HomecellNotesPage', () => {
  let component: HomecellNotesPage;
  let fixture: ComponentFixture<HomecellNotesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomecellNotesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomecellNotesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
