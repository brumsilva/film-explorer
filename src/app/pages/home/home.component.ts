import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private readonly toastr: ToastrService) {}
  ngOnInit(): void {
    this.toastr.success('Bem vindo ao Film Explorer, Clique no coração e adicione o filme a sua lista de favoritos.');
  }
}
