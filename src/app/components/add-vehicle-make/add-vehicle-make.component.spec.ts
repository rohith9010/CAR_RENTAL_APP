import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVehicleMakeComponent } from './add-vehicle-make.component';

describe('AddVehicleMakeComponent', () => {
  let component: AddVehicleMakeComponent;
  let fixture: ComponentFixture<AddVehicleMakeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddVehicleMakeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddVehicleMakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
