import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../heroes.service';
import { Hero } from '../entities/hero';

@Component({
    selector: 'app-heroes',
    templateUrl: './heroes.component.html',
    styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

    heroes: Hero[];

    constructor(private heroesService: HeroesService) { }

    ngOnInit() {
    }

    addHero(newHero: Hero) {
        this.heroesService.addHero(newHero)
            .subscribe(hero => this.heroes.push(hero));
    }

    deleteHero(hero: Hero) {
        this.heroes = this.heroes.filter(h => h!== hero);
        this.heroesService.deleteHero(hero.id).subscribe();
    }
}
