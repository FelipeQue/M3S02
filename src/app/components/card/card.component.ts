import { DatePipe, CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-card',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  providers: [DatePipe]
})
export class CardComponent {

  @Input() data: any;

  faHeart = faHeart;
  datePipe = inject(DatePipe);

  getYear(dateString: string): any {
    return this.datePipe.transform(dateString, 'yyyy');
  }

}
