import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Character } from '../../core/models/character.model';
import { CharacterComponent } from '../character/character.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from '../search/search.component';
import { PaginationComponent } from '../pagination/pagination.component';

@Component({
  selector: 'characters-list',
  standalone: true,
  imports: [
    CommonModule,
    CharacterComponent,
    ReactiveFormsModule,
    SearchComponent,
    PaginationComponent,
  ],
  templateUrl: './characters-list.component.html',
  styleUrl: './characters-list.component.scss',
})
export class CharactersListComponent implements OnInit {
  @Input() characters: Character[];
  @Input() searchValue: string = '';
  @Output() pageNumber = new EventEmitter<number>();

  filteredCharacters: Character[];

  ngOnChanges() {
    if (this.searchValue) {
      this.filterCharacters(this.searchValue);
    } else if (this.searchValue == '') {
      this.filterCharacters(this.searchValue);
    }
  }

  ngOnInit() {
    this.filteredCharacters = this.characters;
  }

  paginate(pageNumber: number) {
    this.pageNumber.emit(pageNumber);
  }
  filterCharacters(searchValue: string) {
    this.filteredCharacters = this.characters.filter((character) =>
      character.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }
}
