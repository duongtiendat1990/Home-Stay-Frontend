import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishHouseComponent } from './publish-house.component';

describe('CreateHouseComponent', () => {
  let component: PublishHouseComponent;
  let fixture: ComponentFixture<PublishHouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishHouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
