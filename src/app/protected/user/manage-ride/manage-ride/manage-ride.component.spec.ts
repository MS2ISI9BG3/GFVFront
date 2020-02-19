import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRideComponent } from './manage-ride.component';

describe('ManageRideComponent', () => {
  let component: ManageRideComponent;
  let fixture: ComponentFixture<ManageRideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageRideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
