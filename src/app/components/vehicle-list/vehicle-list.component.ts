import { Component, inject } from '@angular/core';
import { CardComponent } from "../card/card.component";
import { VehicleService } from '../../services/vehicle.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-vehicle-list',
  standalone: true,
  imports: [CardComponent, ReactiveFormsModule],
  templateUrl: './vehicle-list.component.html',
  styleUrl: './vehicle-list.component.scss'
})
export class VehicleListComponent {

  vehicles: any = [];
  searchResults: any = [];
  vehiclesService = inject(VehicleService);
  router = inject(Router);

  vehicleSearch = new FormGroup({
    searchInput: new FormControl('')
  });

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

  searchVehicle() {
    const searchInput = this.vehicleSearch.value.searchInput?.trim();
    if (searchInput) {
      this.vehiclesService.list().subscribe((data) => {
        this.vehicles = data;
        this.searchResults = this.vehicles.filter((searchedVehicle: { name: string, type: string, }) => {
          const isNameMatch = searchedVehicle.name && searchedVehicle.name.toLowerCase().includes(searchInput.toLowerCase());
          const isTypeMatch = searchedVehicle.type && searchedVehicle.type.includes(searchInput);
          return isNameMatch || isTypeMatch ;
        });
        this.searchResults.sort((a: any,b: any) => a.name.localeCompare(b.name));
        if (this.searchResults.length === 0) {
          alert("Não foram encontrados veículos com este modelo ou tipo.");
        }
        this.vehicles = this.searchResults;
      });
    } else {
      this.vehiclesService.list().subscribe((data) => {
        this.vehicles = data;
      });
      alert("A lista de veículos foi recarregada.");
    }



  };




}
