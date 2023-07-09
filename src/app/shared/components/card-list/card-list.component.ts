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
  isFavorite: boolean = false;

  constructor (private readonly service: TmdbService) { }

  ngOnInit(): void {
    this.service.getPopularMovies().subscribe((response) => {
      this.movies = response.results;

      this.movies.forEach((movie) => {
        movie.poster_path = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        movie.movie_liked = false;
      });
    });
  }

  addtoFavoriteList(movie: Movie) {
    console.log(movie);
  }
}
