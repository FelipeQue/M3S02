import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';
import { FavoriteCountService } from '../../services/favorite-count.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  favoriteCountService = inject(FavoriteCountService);
  favoriteCount: number = 0;
  faHeart = faHeart;

  ngOnInit(): void {
    this.favoriteCountService.favoriteAmount$.subscribe(amount => {
      this.favoriteCount = amount;
    });
    this.favoriteCountService.updateFavoriteCount();
  }

}
