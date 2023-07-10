import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/enviorments/environments';
import { Movie } from 'src/models/Movie';

@Injectable({
  providedIn: 'root'
})
export class FavoritesFilmsService {

  constructor(private http: HttpClient) { }

  addFavoriteFilm(film: any) {
    const email = localStorage.getItem('email');
    const url = `${environment.api}favorites/${email}`;
    return this.http.post<any>(url, film);
  }

  getFavoritesFilmByUser() {
    const email = localStorage.getItem('email');
    const url = `${environment.api}user/${email}`;
    return this.http.get<any>(url);
  }

  removeFavoriteFilm(film: Movie) {
    const email = localStorage.getItem('email');
    const url = `${environment.api}favorites/${email}`;
    return this.http.delete<any>(url, {
      body: film
    });
  }
}
