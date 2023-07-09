import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private apiKey = 'b1c94bec9462fb6dfd9a0fb41af00c5e';

  constructor(private http: HttpClient) { }

  getPopularMovies() {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${this.apiKey}&language=pt-BR&page=1&region=BR`;

    return this.http.get<any>(url);
  }
}

