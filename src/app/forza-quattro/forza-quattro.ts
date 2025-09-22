import { Component, EventEmitter, inject, Output } from '@angular/core';
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
  sequenza: number = 0
  checkWinner(idColonna: number, palliniColonna: number[]) {
    let ultimoIndexPallinoInserito = this.individuaUltimoPallino(palliniColonna);
    //aggiorna colonna
    this.griglia[idColonna] = palliniColonna;



    // controllo su colonna
    for (let pallino of palliniColonna) {
      if (pallino == this.giocatoreDiTurno) {
        this.sequenza++;
        if (this.sequenza == 4) {
          this.flag = true;
          return;
        }

      }
      else {
        this.sequenza = 0;
      }
    }


    //controllo riga
    this.sequenza = 0;
    for (let numeroColonna in this.griglia) {
      if (this.griglia[numeroColonna][ultimoIndexPallinoInserito] == this.giocatoreDiTurno) {
        this.sequenza++;


        if (this.sequenza == 4) {
          this.flag = true;
          return;
        }

      }
      else {
        this.sequenza = 0;
      }
    }


    let contatore = 0;
    console.log(this.griglia[idColonna][ultimoIndexPallinoInserito]);
    console.log(this.griglia[idColonna + 1][ultimoIndexPallinoInserito + 1]);



    //controllo diagonale
    for (let i = 0; i < idColonna - 1; i++) {
      if (this.griglia[idColonna][ultimoIndexPallinoInserito] == this.griglia[idColonna + 1][++ultimoIndexPallinoInserito + 1] && this.griglia[idColonna][ultimoIndexPallinoInserito] != 0) {
        contatore++
        console.log(contatore, "contatore");

        if (contatore == 4) {
          console.log("vinto");
        }

      }
    }
    //console.log(idColonna);
    //console.log(ultimoIndexPallinoInserito);   
    //console.log(lastPallino);



    this.giocatoreDiTurno = 3 - this.giocatoreDiTurno;
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
      this.sequenza
      this.flag = false;
      this.giocatoreDiTurno = 1;
    }
  }

  private router = inject(Router);

  tornaHome() {
    this.router.navigate(['']);

  }
}
