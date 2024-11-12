import { Component, inject, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'character',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss',
})
export class CharacterComponent {
  private router: Router = inject(Router);
  @Input() name: string;
  @Input() url: string;

  navigateToDetails(url: string): void {
    console.log("shemovida");
    
    const regex = /\/(\d+)\//;
    const match = url.match(regex);
    const id = match ? match[1] : '';

    if (id) {
      this.router.navigate([`/character/${id}`]);
    }
  }
}
