import { Component, OnInit } from '@angular/core';
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

  constructor (private readonly service: TmdbService, private readonly favoritesService: FavoritesFilmsService) { }

  ngOnInit(): void {
    console.log('teste')
    this.favoritesService.getFavoritesFilmByUser().subscribe((response) => {
      console.log(response)
      this.movies = response.favoriteMovies;

      this.movies.forEach((movie) => {
        movie.poster_path = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      });
    });
  }

  removeToFavoriteList(movie: Movie) {
    this.favoritesService.removeFavoriteFilm(movie).subscribe((response) => {
    })
  }
}
