import { Component, EventEmitter, Output } from '@angular/core';
import { FillPipe } from '../../core/pipes/fill.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pagination',
  standalone: true,
  imports: [CommonModule, FillPipe],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  @Output() pageNumber = new EventEmitter<number>();
  currentPage = 1;
  totalPages = 9;
  pages: number[] = [];

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.pageNumber.emit(page);
    }
  }
}
