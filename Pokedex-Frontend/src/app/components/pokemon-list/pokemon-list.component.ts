import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PokemonService } from '../../services/pokemon.service';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-pokemon-list',
  imports: [CommonModule, RouterModule, FormsModule, SpinnerComponent],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
  standalone: true,
})
export class PokemonListComponent {
  pokemon: any[] = [];
  filteredPokemon: any[] = [];
  searchQuery: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 1;
  isLoading = true;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.getPokemon();
  }

  getPokemon() {
    this.pokemonService.getAllPokemon(0, 1000).subscribe((data) => {
      this.pokemon = data.results.sort(function (a: any, b: any) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      this.filteredPokemon = this.pokemon.slice(0, this.itemsPerPage);
      this.totalPages = Math.ceil(this.pokemon.length / this.itemsPerPage);
      this.isLoading = false;
    });
  }

  searchPokemon() {
    this.isLoading = true;
    if (this.searchQuery) {
      const filtered = this.pokemon.filter((pokemon) =>
        pokemon.name.toLowerCase().startsWith(this.searchQuery.toLowerCase())
      );
      this.totalPages = Math.ceil(filtered.length / this.itemsPerPage);
      this.currentPage = 1;
      this.paginateFilteredPokemon(filtered);
    } else {
      this.totalPages = Math.ceil(this.pokemon.length / this.itemsPerPage);
      this.currentPage = 1;
      this.filteredPokemon = this.pokemon.slice(0, this.itemsPerPage);
    }
    this.isLoading = false;
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    const startIndex = (page - 1) * this.itemsPerPage;
    if (this.searchQuery) {
      const filtered = this.pokemon.filter((pokemon) =>
        pokemon.name.toLowerCase().startsWith(this.searchQuery.toLowerCase())
      );
      this.paginateFilteredPokemon(filtered, startIndex);
    } else {
      this.filteredPokemon = this.pokemon.slice(
        startIndex,
        startIndex + this.itemsPerPage
      );
    }
  }

  paginateFilteredPokemon(filtered: any[], startIndex = 0) {
    this.filteredPokemon = filtered.slice(
      startIndex,
      startIndex + this.itemsPerPage
    );
  }
}
