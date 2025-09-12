import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Colonna } from './colonna/colonna';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Colonna],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('forza-quattro');
  giocatoreDiTurno:number = 1;

  cambiaGiocatore(){
    this.giocatoreDiTurno = 3- this.giocatoreDiTurno;
  }
}

