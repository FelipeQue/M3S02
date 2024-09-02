import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  faHeart = faHeart;
  favoriteCount: number = 0;

  ngOnInit(): void {
    let favorites = JSON.parse(localStorage.getItem('favoritos') || "[]");
    this.favoriteCount = favorites.length;
  }

}
