import { Component} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { Colonna } from '../colonna/colonna';

@Component({
  selector: 'app-forza-quattro',
  imports: [Colonna,FontAwesomeModule,CommonModule],
  templateUrl: './forza-quattro.html',
  styleUrl: './forza-quattro.css'
})
export class ForzaQuattro {

  giocatoreDiTurno=1;
  griglia:number[][] = [
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0],
    [0,0,0,0,0,0]
  ]
  flag: boolean= false;
  faUser = faUser;
  checkWinner(columnId:number, palliniColonna: number[]){
    let ultimoIndexPallinoInserito =  this.individuaUltimoPallino(palliniColonna);
    //aggiorna colonna
    this.griglia[columnId]= palliniColonna;
    let sequenza = 0;
    
   console.log(ultimoIndexPallinoInserito);
    

    // controllo su colonna
    for(let pallino of palliniColonna){
      if(pallino== this.giocatoreDiTurno){
        sequenza++;
        if(sequenza==4){
          this.flag=true;
          return;
        }

      }
      else{
        sequenza=0;
      }
    }


    //controllo riga
    sequenza=0;
    for(let numeroColonna in this.griglia){
      if(this.griglia[numeroColonna][ultimoIndexPallinoInserito]== this.giocatoreDiTurno){
        sequenza++;
        
        
      if(sequenza==4){
          this.flag=true;
          return;
        }

      }
      else{
        sequenza=0;
      }
    }

    //controllo diagonale
    switch (true) {
      
    case(ultimoIndexPallinoInserito<3 && columnId<3):

    case(ultimoIndexPallinoInserito==3 && columnId==2):

    case(ultimoIndexPallinoInserito<3 && columnId>3):

    case(ultimoIndexPallinoInserito==3 && columnId>3):

    case(ultimoIndexPallinoInserito==3 && columnId<3):

    
    
    }
    
    this.giocatoreDiTurno = 3- this.giocatoreDiTurno;
  }
  
  individuaUltimoPallino(array: number[]): number{
    for(let i = 1; i<array.length; i++){
      if (array[i] === 0) {
      return i-1; 
    }
    }
    return array.length-1;
  }
}
