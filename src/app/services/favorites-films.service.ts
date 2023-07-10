import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from 'src/models/Movie';

@Injectable({
  providedIn: 'root'
})
export class FavoritesFilmsService {

  constructor(private http: HttpClient) { }

  addFavoriteFilm(film: any) {
    const email = localStorage.getItem('email');
    const url = `http://localhost:3000/favorites/${email}`;
    return this.http.post<any>(url, film);
  }

  getFavoritesFilmByUser() {
    const email = localStorage.getItem('email');
    const url = `http://localhost:3000/user/${email}`;
    return this.http.get<any>(url);
  }

  removeFavoriteFilm(film: any) {
    const email = localStorage.getItem('email');
    const url = `http://localhost:3000/favorites/${email}`;
    return this.http.delete<any>(url, film);
  }
}
