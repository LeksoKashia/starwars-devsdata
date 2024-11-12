import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'fill',
  standalone: true,
})
export class FillPipe implements PipeTransform {
  transform(value: number): number[] {
    return Array.from({ length: value }, (_, index) => index + 1);
  }
}
