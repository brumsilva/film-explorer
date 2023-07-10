import { FavoritesFilmsService } from './../../../services/favorites-films.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TmdbService } from 'src/app/services/tmdb.service';
import { Movie } from 'src/models/Movie';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss']
})
export class CardListComponent implements OnInit {
  movies: Array<Movie> = [];

  constructor (private readonly service: TmdbService, private readonly favoritesService: FavoritesFilmsService, private readonly toastr: ToastrService) { }

  ngOnInit(): void {
    this.service.getPopularMovies().subscribe({
      next: (response: any) => {
        this.movies = response.results.slice(0, 10);

        this.movies.forEach((movie) => {
          movie.poster_path = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        });
      },
      error: (err) => {
        this.toastr.error(err.error.message);
      },
    });
  }

  addtoFavoriteList(movie: Movie) {
    this.favoritesService.addFavoriteFilm(movie).subscribe({
      next: (res: any) => {
        this.toastr.success('Filme Adicionado a sua lista de favoritos.');
      },
      error: (err: any) => {
        this.toastr.error(err.error.message);
      }
    })
  }
}
