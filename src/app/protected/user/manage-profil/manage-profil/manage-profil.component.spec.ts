import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageProfilComponent } from './manage-profil.component';

describe('ManageProfilComponent', () => {
  let component: ManageProfilComponent;
  let fixture: ComponentFixture<ManageProfilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageProfilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
