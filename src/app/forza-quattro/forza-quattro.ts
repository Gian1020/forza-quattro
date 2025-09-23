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

    // controllo su colonna
    for (let pallino of colonnaCliccata) {
      if (pallino == this.giocatoreDiTurno) {
        sequenza++;
        if (sequenza == 4) {
          this.flag = true;
          console.log("colonna");
          return;

        }
      }
      else {
        sequenza = 0;
      }
    }
  }

  controlloRiga(colonnaCliccata: number[]) {
    //controllo riga

    let sequenza = 0;
    let indexUltimoPallinoInserito = this.individuaUltimoPallino(colonnaCliccata);
    console.log(indexUltimoPallinoInserito);


    for (let i = 0; i < this.griglia.length; i++) {
      if (this.griglia[i][indexUltimoPallinoInserito] == this.giocatoreDiTurno) {
        sequenza++;
        console.log(`colonna ${i} → match, sequenza = ${sequenza}`);

        if (sequenza == 4) {
          this.flag = true;
          sequenza = 0;
          return;

        }
      }
      else {
        sequenza = 0;
        console.log(`colonna ${i} → reset sequenza = 0`);
      }
    }
  }


  controlloDiagonale(idCol: number, colonnaCliccata: number[]) {

    let indexUltimoPallinoInserito = this.individuaUltimoPallino(colonnaCliccata);
    let ultimoPallinoInserito: number = this.griglia[idCol][indexUltimoPallinoInserito];
    let col = idCol;
    let riga = indexUltimoPallinoInserito;
    let contatore: number = 1;

    // let pallinoDaControllare1 = this.griglia[col + 1][riga + 1];
    // let pallinoDaControllare2 = this.griglia[col - 1][riga + 1];
    // let pallinoDaControllare4 = this.griglia[col + 1][riga - 1];
    // let pallinoDaControllare3 = this.griglia[col - 1][riga - 1];

    //console.log("pallino alto xd", pallinoDaControllare1);
    // console.log("pallino alto xs", pallinoDaControllare2);
    // console.log("pallino basso xs", pallinoDaControllare3);
    // console.log("pallino basso xd", pallinoDaControllare4);

    //console.log("pallino Inserito", ultimoPallinoInserito);

    // diagonale basso xs
    for (let i = 1; i < 4; i++) {
      if (this.griglia[col + i] !== undefined &&
        this.griglia[col + i][riga + i] !== undefined &&
        ultimoPallinoInserito == this.griglia[col + i][riga + i]) {

        contatore++;

        if (contatore == 4) {
          this.flag = true;
          console.log("diagonale xs 1");
          return;
        }

      } else {
        contatore = 1;
        break;
      }
    }

    //diagonale alto xd
    for (let i = 1; i < 4; i++) {
      if (this.griglia[col - i] !== undefined &&
        this.griglia[col - i][riga - i] !== undefined &&
        ultimoPallinoInserito == this.griglia[col - i][riga - i]) {

        contatore++;

        if (contatore == 4) {
          this.flag = true;
          console.log("diagonale xd 2");
          return;

        }
      }
      else {
        contatore = 1;
        break;
      }
    }

    //diagonale alto xs
    for (let i = 1; i < 4; i++) {
      if (this.griglia[col + i] !== undefined &&
        this.griglia[col + i][riga - i] !== undefined &&
        ultimoPallinoInserito == this.griglia[col + i][riga - i]) {

        contatore++;

        if (contatore == 4) {
          this.flag = true;
          console.log("diagonale xd 2");
          return;
        }

      }
      else {
        contatore = 1;
        break;
      }
    }

    //diagonale basso xd
    for (let i = 1; i < 4; i++) {
      if (this.griglia[col - i] !== undefined &&
        this.griglia[col - i][riga + i] !== undefined &&
        ultimoPallinoInserito == this.griglia[col - i][riga + i]) {

        contatore++;
        if (contatore == 4) {
          this.flag = true;
          console.log("diagonale xd 1");
          return;
        }
      }
      else {
        contatore = 1;
        break;
      }
    }
  }


  checkWinner(idColonna: number, palliniColonna: number[]) {
    if (this.flag) {
      return;
    }

    //aggiorna colonna
    this.griglia[idColonna] = palliniColonna;

    this.controlloColonna(palliniColonna);

    this.controlloRiga(palliniColonna);

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

      console.log(this.deviResettare);
    }
  }

  private router = inject(Router);

  tornaHome() {
    this.router.navigate(['']);

  }
}
