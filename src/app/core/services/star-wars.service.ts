import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable } from 'rxjs';
import { Character } from '../models/character.model';
import { ApiEnum } from '../const/api.enums';

@Injectable({
  providedIn: 'root',
})
export class StarWarsService {
  private http: HttpClient = inject(HttpClient);

  constructor() {}

  getStarWarsCharacters(pageNumber: number = 1): Observable<Character[]> {
    return this.http
      .get<{ results: Character[] }>(
        `${environment.baseUrl_api}/${ApiEnum.PEOPLE}/?page=${pageNumber}`
      )
      .pipe(map((response) => response.results));
  }

  getDetailsOfCharacter(characterId: number): Observable<Character> {
    return this.http.get<Character>(
      `${environment.baseUrl_api}/${ApiEnum.PEOPLE}/${characterId}`
    );
  }

  getComplexData(urls: string[]): Observable<any[]> {
    const requests = urls.map((url) =>
      this.http.get(`${url}`).pipe(
        map((response) => {
          return Object.keys(response)
            .filter((key) => {
              const value = response[key];
              return (
                key !== 'created' &&
                key !== 'edited' &&
                !(
                  Array.isArray(value) ||
                  (typeof value === 'object' && value !== null)
                )
              );
            })
            .reduce((filteredResponse, key) => {
              filteredResponse[key] = response[key];
              return filteredResponse;
            }, {} as any);
        })
      )
    );

    return forkJoin(requests);
  }
}
