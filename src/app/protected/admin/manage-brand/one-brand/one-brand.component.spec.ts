import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneBrandComponent } from './one-brand.component';

describe('OneBrandComponent', () => {
  let component: OneBrandComponent;
  let fixture: ComponentFixture<OneBrandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneBrandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
