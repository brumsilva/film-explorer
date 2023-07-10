import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { CardListFavoritesComponent } from './components/card-list-favorites/card-list-favorites.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CardListComponent,
    CardListFavoritesComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    CardListComponent,
    CardListFavoritesComponent,
  ]
})
export class SharedModule { }
