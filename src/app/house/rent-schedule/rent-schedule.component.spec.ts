import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentScheduleComponent } from './rent-schedule.component';

describe('RentScheduleComponent', () => {
  let component: RentScheduleComponent;
  let fixture: ComponentFixture<RentScheduleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentScheduleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
