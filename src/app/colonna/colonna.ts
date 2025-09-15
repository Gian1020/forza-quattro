import { Component,EventEmitter,Input, Output} from '@angular/core';


@Component({
  selector: 'app-colonna',
  imports: [],
  templateUrl: './colonna.html',
  styleUrl: './colonna.css'
})
export class Colonna {
  @Input() giocatore!:number;
  @Output() urla = new EventEmitter<number[]>();
  
  
  pallini:number[]=[0,0,0,0,0,0];

  inserisciPedina(){
    for(let index in this.pallini){
      if(this.pallini[index] ==0){
        this.pallini[index] =this.giocatore;
        this.urla.emit(this.pallini);
        break;
      }
    }
  }


}