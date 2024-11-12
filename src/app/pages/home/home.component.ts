import { CommonModule } from '@angular/common';
import { Component, inject, Inject, OnInit } from '@angular/core';
import { StarWarsService } from '../../core/services/star-wars.service';
import { Character } from '../../core/models/character.model';
import { Observable, tap } from 'rxjs';
import { CharacterComponent } from '../../components/character/character.component';
import { CharactersListComponent } from '../../components/characters-list/characters-list.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { SearchComponent } from '../../components/search/search.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CharacterComponent,
    CharactersListComponent,
    PaginationComponent,
    SearchComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private starWarsService = inject(StarWarsService);
  characters$: Observable<Character[]>;
  filteredCharacters: Character[];
  searchVal: string;
  clearSearch: boolean = false;

  ngOnInit(): void {
    this.characters$ = this.starWarsService.getStarWarsCharacters();

    // .subscribe((res) =>{
    //   this.characters = res;
    //   this.filteredCharacters = this.characters;
    // })
  }

  paginate(pageNumber: number) {
    this.characters$ = this.starWarsService.getStarWarsCharacters(pageNumber);
    this.clearSearch = true;
  }

  getSearchValue(searchValue: string) {
    this.searchVal = searchValue;
    this.clearSearch = false;
  }
}
