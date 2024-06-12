/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Add_ReservationComponent } from './Add_Reservation.component';

describe('Add_ReservationComponent', () => {
  let component: Add_ReservationComponent;
  let fixture: ComponentFixture<Add_ReservationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Add_ReservationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Add_ReservationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
