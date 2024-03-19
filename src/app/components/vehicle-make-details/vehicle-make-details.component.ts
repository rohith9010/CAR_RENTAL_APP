import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-vehicle-make-details',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './vehicle-make-details.component.html',
  styleUrl: './vehicle-make-details.component.css'
})
export class VehicleMakeDetailsComponent {

}
