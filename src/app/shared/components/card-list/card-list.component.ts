import { FavoritesFilmsService } from './../../../services/favorites-films.service';
import { Component, OnInit } from '@angular/core';
import { TmdbService } from 'src/app/services/tmdb.service';
import { Movie } from 'src/models/Movie';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {
  movies: Array<Movie> = [];

  constructor (private readonly service: TmdbService, private readonly favoritesService: FavoritesFilmsService) { }

  ngOnInit(): void {
    this.service.getPopularMovies().subscribe((response) => {
      this.movies = response.results.slice(0, 10);

      this.movies.forEach((movie) => {
        movie.poster_path = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      });
    });
  }

  addtoFavoriteList(movie: Movie) {
    this.favoritesService.addFavoriteFilm(movie).subscribe((response) => {
    })
  }
}
