import { Component, inject } from '@angular/core';
import { VehicleService } from '../../services/vehicle.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-vehicle-detail',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './vehicle-detail.component.html',
  styleUrl: './vehicle-detail.component.scss',
  providers: [DatePipe]
})
export class VehicleDetailComponent {

  vehicleService = inject(VehicleService);
  activatedRoute = inject(ActivatedRoute);
  datePipe = inject(DatePipe);
  faHeart = faHeart;
  vehicle: any = {};

  ngOnInit(){
    this.activatedRoute.params.subscribe({
      next: (params: any)=>{
        this.vehicleService.getById(params.id).subscribe({
          next: (data)=>{
            this.vehicle = data;
          },
          error:(error)=>{ console.log("Erro ao buscar veículos por id",error) }
        })
      },
      error:(error)=>{ console.log("Erro ao capturar os parâmetros de rota",error) },
    })

  }


  getYear(dateString: string): any {
    return this.datePipe.transform(dateString, 'yyyy');
  }

}
