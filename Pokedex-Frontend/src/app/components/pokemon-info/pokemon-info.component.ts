import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, SpinnerComponent],
  templateUrl: './pokemon-info.component.html',
  styleUrls: ['./pokemon-info.component.scss'],
})
export class PokemonInfoComponent {
  pokemon: any;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit() {
    const name = this.route.snapshot.paramMap.get('name');
    this.pokemonService.getPokemonByName(name!).subscribe((data) => {
      this.pokemon = data;
      this.isLoading = false;
    });
  }
}
