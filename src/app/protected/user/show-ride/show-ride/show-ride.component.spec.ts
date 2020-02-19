import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowRideComponent } from './show-ride.component';

describe('ShowRideComponent', () => {
  let component: ShowRideComponent;
  let fixture: ComponentFixture<ShowRideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowRideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
