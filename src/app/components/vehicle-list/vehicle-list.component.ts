import { Component, inject } from '@angular/core';
import { CardComponent } from "../card/card.component";
import { VehicleService } from '../../services/vehicle.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.scss'
})
export class VehicleListComponent {

  vehicles: any = [];
  vehiclesService = inject(VehicleService);
  router = inject(Router);

  ngOnInit(){
    this.vehiclesService.list().subscribe({
      next: (data: any)=>{
        let favorites = JSON.parse(localStorage.getItem('favoritos') || "[]");
        data.forEach((element:any) => {
          let isFavorite = favorites.some((favorite:any)=>favorite.id === element.id);
          if(isFavorite){
            element.favorite = true;
          }else{
            element.favorite = false;
          }
        });
        this.vehicles = data;
      },
      error: (error)=>{console.error("Erro ao recuperar informações de veículos: ",error) }

    })
  }

  redirectToDetail(id: number){
    this.router.navigate(["vehicle", id]);
  }


}
