import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StarWarsService } from '../../core/services/star-wars.service';
import { finalize, Observable, tap } from 'rxjs';
import { Character } from '../../core/models/character.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private starWarsService = inject(StarWarsService);
  character$: Observable<Character>;
  complexData: Observable<any>;
  type: string = '';
  loader: boolean = false;

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.character$ = this.starWarsService.getDetailsOfCharacter(+id);
  }

  seeComplexData(character: Character, type: string) {
    if (character && character[type]) {
      const urls = character[type];
      this.loader = true;
      this.type = type;
      this.complexData = this.starWarsService.getComplexData(urls).pipe(
        tap((res) => {
          console.log(res);
        }),
        finalize(() => {
          this.loader = false;
        })
      );
    }
  }
}
