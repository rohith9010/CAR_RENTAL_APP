import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleMakeDetailsComponent } from './vehicle-make-details.component';

describe('VehicleMakeDetailsComponent', () => {
  let component: VehicleMakeDetailsComponent;
  let fixture: ComponentFixture<VehicleMakeDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehicleMakeDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VehicleMakeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
