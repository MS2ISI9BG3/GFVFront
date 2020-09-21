import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OneRideComponent} from './one-ride.component';

describe('OneRideComponent', () => {
  let component: OneRideComponent;
  let fixture: ComponentFixture<OneRideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OneRideComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
