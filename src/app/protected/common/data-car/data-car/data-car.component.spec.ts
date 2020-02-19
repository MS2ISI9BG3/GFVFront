import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataCarComponent } from './data-car.component';

describe('DataCarComponent', () => {
  let component: DataCarComponent;
  let fixture: ComponentFixture<DataCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
