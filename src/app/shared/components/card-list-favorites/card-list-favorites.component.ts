import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FavoritesFilmsService } from 'src/app/services/favorites-films.service';
import { TmdbService } from 'src/app/services/tmdb.service';
import { Movie } from 'src/models/Movie';

@Component({
  selector: 'app-card-list-favorites',
  templateUrl: './card-list-favorites.component.html',
  styleUrls: ['./card-list-favorites.component.scss']
})
export class CardListFavoritesComponent implements OnInit {
  movies: Array<Movie> = [];

  constructor (private readonly service: TmdbService, private readonly favoritesService: FavoritesFilmsService, private readonly toastr: ToastrService) { }

  ngOnInit(): void {
    this.findFavoritesFilms();
  }

  removeToFavoriteList(movie: any) {
    this.favoritesService.removeFavoriteFilm(movie).subscribe({
      next: (res: any) => {
        this.toastr.success('Filme removido da sua lista de favoritos.');
        this.findFavoritesFilms();
      },
      error: (err: any) => {
        this.toastr.error(err.error.message);
      }
    })
  }

  findFavoritesFilms() {
    this.favoritesService.getFavoritesFilmByUser().subscribe({
      next: (response: any) => {
        this.movies = response.favoriteMovies;

        this.movies.forEach((movie) => {
          movie.poster_path = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        });
      },
      error: (err) => {
        this.toastr.error(err.error.message);
      }
    });
  }
}
