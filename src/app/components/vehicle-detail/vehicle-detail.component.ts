import { Component, inject } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vehicle-detail',
  standalone: true,
  imports: [],
  templateUrl: './vehicle-detail.component.html',
  styleUrl: './vehicle-detail.component.scss'
})
export class VehicleDetailComponent {

  vehicleService = inject(VehicleService);
  activatedRoute = inject(ActivatedRoute);
  vehicle: any = {};

  ngOnInit(){
    this.activatedRoute.params.subscribe({
      next: (data)=>{
        this.vehicle = data;
      },
      error:(error)=>{},
    })

  }

}
