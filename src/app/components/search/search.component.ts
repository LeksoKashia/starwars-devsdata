import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { tap } from 'rxjs';

@Component({
  selector: 'search',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit, OnChanges {
  private formBuilder: FormBuilder = inject(FormBuilder);
  @Output() searchInputValue = new EventEmitter<string>();
  @Input() clear: boolean;
  searchForm: FormGroup;

  ngOnChanges(): void {
    if (this.clear == true) {
      this.searchForm.setValue({
        searchInput: ''
      })
    }
  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchInput: [''],
    });

    this.searchForm.get('searchInput').valueChanges.subscribe((res) => {
      this.searchInputValue.emit(res);
    });
  }
}
