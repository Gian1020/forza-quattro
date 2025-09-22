import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Card } from '../interfacce/card';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faHouse, faArrowRotateRight} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
@Component({
  selector: 'app-board',
  imports: [CommonModule,FontAwesomeModule],
  templateUrl: './board.html',
  styleUrls: ['./board.css']
})
export class Board implements OnInit {
  cards: Card[] = [];
  contatoreClick: number = 0;
  turnoGiocatore1: boolean = true;
  primaCardClick!: Card;
  punteggioGiocatore1: number = 0;
  punteggioGiocatore2: number = 0;
  isFlipped: boolean = false;
  lock: boolean = false;
  faUser= faUser;
  faHouse=faHouse
  faArrowRotateRight=faArrowRotateRight;
  fineCarte:boolean=false;
  winGiocatore:number=0;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.creaCarte();
  }

  creaCarte() {
    let seeds: number[] = [];
    //creo un array di seed casuali 
    while (seeds.length < 16) {
      let seedCasuale = Math.floor(Math.random() * 100);
      if (!seeds.includes(seedCasuale)) {
        seeds.push(seedCasuale);
        seeds.push(seedCasuale);
      }
    }
    //mischio l ordine dell'array
    for (let seed in seeds) {
      let indexCasuale = Math.floor(Math.random() * seeds.length);
      let varAppoggio = seeds[seed];
      seeds[seed] = seeds[indexCasuale];
      seeds[indexCasuale] = varAppoggio;
    }

    // creo le carte con id unico
    this.cards = seeds.map((seed, index) => ({
      id: index,
      seed,
      flipped: false
    }));
  }

  flipCard(id: number) {
    if (this.lock) return;

    const card = this.cards.find(c => c.id === id);

    if (!card || card.flipped) return;

    card.flipped = true;
    this.contatoreClick++;

    if (this.contatoreClick === 1) {
      //mi salvo il seed della prima carta scelta
      this.primaCardClick = card;
    } else if (this.contatoreClick === 2) {
      //controllo dopo aver controllato i due seed
      this.controllaCoppia(card);
    }
  }

  controllaCoppia(secondaCard: Card) {
    
    if (secondaCard.seed !== this.primaCardClick.seed) {
      this.lock = true;
      setTimeout(() => {
        secondaCard.flipped = false;
        this.primaCardClick.flipped = false;
        this.contatoreClick = 0;
        this.lock = false;
        this.turnoGiocatore1 = !this.turnoGiocatore1;
        this.cdRef.detectChanges();
      }, 1000);
    } else {
      // carte uguali assegna punteggio
      if (this.turnoGiocatore1) this.punteggioGiocatore1++;
      else this.punteggioGiocatore2++;
      this.contatoreClick = 0;

       // controlla se il gioco è finito
      this.controllaVincitore();
    }

  }

  controllaVincitore(){
    if (this.punteggioGiocatore1+this.punteggioGiocatore2 >=8){
        this.fineCarte=true;
      if(this.punteggioGiocatore1>this.punteggioGiocatore2){
        this.winGiocatore=1;
      }
      else if(this.punteggioGiocatore1<this.punteggioGiocatore2){
        this.winGiocatore=2;
      }
      else{
        this.winGiocatore=3;
      }

    }
  }

  reset(){
    this.creaCarte();
    this.punteggioGiocatore1=0;
    this.punteggioGiocatore2=0;
    this.fineCarte=false;
    this.winGiocatore =0;
  }

  private router = inject(Router);

  tornaHome(){
    this.router.navigate(['']);

  }

}


