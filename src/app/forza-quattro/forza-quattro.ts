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
  
  checkWinner(idColonna: number, palliniColonna: number[]) {
    let indexUltimoPallinoInserito = this.individuaUltimoPallino(palliniColonna);
    //aggiorna colonna
    this.griglia[idColonna] = palliniColonna;
    let sequenza: number = 0;

    // controllo su colonna
    for (let pallino of palliniColonna) {
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
    }

    //controllo riga
    sequenza = 0;
    for (let numeroColonna in this.griglia) {
      if (this.griglia[numeroColonna][indexUltimoPallinoInserito] == this.giocatoreDiTurno) {
        sequenza++;
        if (sequenza == 4) {
          this.flag = true;
          return;
        }
      }
      else {
        sequenza = 0;
      }
    }


    let ultimoPallinoInserito: number = this.griglia[idColonna][indexUltimoPallinoInserito];

    let col = idColonna;
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

            if(contatore==4){
              this.flag = true;
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

            if(contatore==4){
              this.flag = true;
              return;
            }
        } 
      else {
        contatore = 1;
        break;
      }
    }

    //diagonale alto xd
    for (let i = 1; i < 4; i++) {
      if (this.griglia[col + i] !== undefined &&
          this.griglia[col + i][riga - i] !== undefined &&
          ultimoPallinoInserito == this.griglia[col + i][riga - i]) {
        
          contatore++;

          if(contatore==4){
              this.flag = true;
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
            if(contatore==4){
              this.flag = true;
              return;
            }
           } 
      else {
        contatore = 1;
        break;
      }
    }

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
      this.flag = false;
      this.giocatoreDiTurno = 1;
    
    setTimeout(() => {
      this.deviResettare = false;
    });}
  }

  private router = inject(Router);

  tornaHome() {
    this.router.navigate(['']);

  }
}
