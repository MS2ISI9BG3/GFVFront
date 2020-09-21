import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ListRideComponent} from './list-ride.component';

describe('ListCarComponent', () => {
  let component: ListRideComponent;
  let fixture: ComponentFixture<ListRideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListRideComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
