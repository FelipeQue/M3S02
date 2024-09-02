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
  isFavorite: boolean = false;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next: (params: any)=>{
        this.vehicleService.getById(params.id).subscribe({
          next: (data)=>{
            this.vehicle = data;
            this.checkIsFavorite();
          },
          error:(error)=>{ console.log("Erro ao buscar veículos por id",error) }
        })
      },
      error:(error)=>{ console.log("Erro ao capturar os parâmetros de rota",error) },
    })
  }

  checkIsFavorite(): void {
    let storage = localStorage.getItem('favoritos'); 
    if(storage){ 
      let favorites = JSON.parse(storage);
      this.isFavorite = favorites.some((favorite: any)=>favorite.id == this.vehicle.id);
    } else{
      localStorage.setItem('favoritos', "[]");
      this.isFavorite = false;
    }
  }

  getYear(dateString: string): string | null {
    return this.datePipe.transform(dateString, 'yyyy');
  }

  toggleFavorites(): void{
    let storage = localStorage.getItem('favoritos'); 
    if(storage){ 
      let favorites = JSON.parse(storage);
      if (this.isFavorite){
        favorites = favorites.filter((favorite: any) => favorite.id !== this.vehicle.id);
        this.isFavorite = false;
        alert("Veículo removido da lista de favoritos.");
      } else {
        favorites.push(this.vehicle);
        this.isFavorite = true;
        alert("Veículo adicionado à lista de favoritos!");
      }
      localStorage.setItem('favoritos', JSON.stringify(favorites));
    }
  }


  }





