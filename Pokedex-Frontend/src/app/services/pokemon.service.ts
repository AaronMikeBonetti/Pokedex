import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private baseUrl = 'http://localhost:3000/api/pokemon';

  constructor(private http: HttpClient) { }

  getAllPokemon(offset = 0, limit = 1000): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?offset=${offset}&limit=${limit}`);
  }

  getPokemonByName(name: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${name}`);
  }

  searchPokemon(name: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}?name=${name}`);
  }
}
