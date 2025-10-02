import { Component, contentChild, EventEmitter, inject, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser, faHouse, faArrowRotateRight } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { Colonna } from '../colonna/colonna';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forza-quattro',
  imports: [Colonna, FontAwesomeModule, CommonModule],
  templateUrl: './forza-quattro.html',
  styleUrl: './forza-quattro.css'
})
export class ForzaQuattro {
  faUser = faUser;
  faHouse = faHouse;
  faArrowRotateRight = faArrowRotateRight;
  giocatoreDiTurno = 1;
  griglia: number[][] = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]
  ]
  flag: boolean = false;
  deviResettare: boolean = false;



  controlloColonna(colonnaCliccata: number[]) {
    let sequenza: number = 0;
    let indexUltimoPallinoInserito = this.individuaUltimoPallino(colonnaCliccata);
    if(!(indexUltimoPallinoInserito<3)){
    // controllo su colonna
    for (let pallino of colonnaCliccata) {
      if (pallino == this.giocatoreDiTurno) {
        sequenza++;
        if (sequenza == 4) {
          this.flag = true;
          return;
        }
      }
      else {
        sequenza = 0;
      }
    }}
  }

  controlloRiga(idCol: number,colonnaCliccata: number[]) {
    //controllo riga
    let sequenza = 0;
    let indexUltimoPallinoInserito = this.individuaUltimoPallino(colonnaCliccata);

    for (let i = 0; i < this.griglia.length; i++) {
      if (this.griglia[i][indexUltimoPallinoInserito] == this.giocatoreDiTurno) {
        sequenza++;
        if (sequenza == 4) {
          this.flag = true;
          sequenza = 0;
          return;
        }
      }
      else {
        sequenza = 0;
      }
    }
    
  }


  controlloDiagonale(idCol: number, colonnaCliccata: number[]) {

    let indexUltimoPallinoInserito = this.individuaUltimoPallino(colonnaCliccata);
    let ultimoPallinoInserito: number = this.griglia[idCol][indexUltimoPallinoInserito];
    let col = idCol;
    let riga = indexUltimoPallinoInserito;
    let contatore: number = 1;

    if(!(idCol<3&& indexUltimoPallinoInserito>2)||!(idCol<3&&indexUltimoPallinoInserito<3)){
    // ultimo pallino alto xd
    // controlla la diagonale in basso sx
    for (let i = 1; i < 4; i++) {
      if (this.griglia[col + i] !== undefined &&
        this.griglia[col + i][riga + i] !== undefined &&
        ultimoPallinoInserito == this.griglia[col + i][riga + i]) {
        
        contatore++;

        if (contatore == 4) {
          this.flag = true;
          return;
        }

      } else {
        contatore = 1;
        break;
      }
    }

    
    //ultimo pallino basso xs
    //controlla la digonale in alto dx
    for (let i = 1; i < 4; i++) {
      if (this.griglia[col - i] !== undefined &&
        this.griglia[col - i][riga - i] !== undefined &&
        ultimoPallinoInserito == this.griglia[col - i][riga - i]) {
      
        contatore++;
      
        if (contatore == 4) {
          this.flag = true;    
          return;

        }
      }
      else {
        contatore = 1;
        break;
      }
    }}

    if(!(idCol<3&&indexUltimoPallinoInserito<3) || !(idCol>3&& indexUltimoPallinoInserito>3)){
    //ultimo pallino basso xd
    //controlla la diagonale in alto sx
    for (let i = 1; i < 4; i++) {
      if (this.griglia[col + i] !== undefined &&
        this.griglia[col + i][riga - i] !== undefined &&
        ultimoPallinoInserito == this.griglia[col + i][riga - i]) {

        contatore++;

        if (contatore == 4) {
          this.flag = true;
          return;
        }
      }
      else {
        contatore = 1;
        break;
      }
    }

    // ultimo pallino alto xs
    // controlla la diagonale in basso dx
    
    for (let i = 1; i < 4; i++) {
      if (this.griglia[col - i] !== undefined &&
        this.griglia[col - i][riga + i] !== undefined &&
        ultimoPallinoInserito == this.griglia[col - i][riga + i]) {
        contatore++;
        if (contatore == 4) {
          this.flag = true;
          return;
        }
      }
      else {
        contatore = 1;
        break;
      }
    }}
  }


  checkWinner(idColonna: number, palliniColonna: number[]) {
    if (this.flag) {
      return;
    }

    //aggiorna colonna
    this.griglia[idColonna] = palliniColonna;

    this.controlloColonna(palliniColonna);

    this.controlloRiga(idColonna,palliniColonna);

    this.controlloDiagonale(idColonna, palliniColonna);
    if (!this.flag) {
      this.giocatoreDiTurno = 3 - this.giocatoreDiTurno;
    }
  }


  individuaUltimoPallino(array: number[]): number {
    for (let i = 1; i < array.length; i++) {
      if (array[i] === 0) {
        return i - 1;
      }
    }
    return array.length - 1;
  }



  reset() {
    if (this.flag) {
      this.deviResettare = true;
      this.flag = false;
      this.giocatoreDiTurno = 1;


      this.griglia = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
      ]

      setTimeout(() => {
        this.deviResettare = false;
      }, 0);

      
    }
  }

  private router = inject(Router);

  tornaHome() {
    this.router.navigate(['']);

  }
}
