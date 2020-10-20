import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AssignOrgStructPosPage } from './assign-org-struct-pos.page';

describe('AssignOrgStructPosPage', () => {
  let component: AssignOrgStructPosPage;
  let fixture: ComponentFixture<AssignOrgStructPosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignOrgStructPosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AssignOrgStructPosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
