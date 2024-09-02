import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteCountService {
  constructor() { }

  storageKey: string = 'favoritos';

  private favoriteAmount = new Subject<number>();

  favoriteAmount$ = this.favoriteAmount.asObservable();

  updateFavoriteCount() {
    try {
      let favorites = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
      this.favoriteAmount.next(favorites.length);
    } catch (error) {
      console.error('Erro ao recuperar favoritos do localStorage', error);
      this.favoriteAmount.next(0);
    }
  };

}
