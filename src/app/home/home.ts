import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home { 
private router = inject(Router);

  inizioGioco(giocoScelto:string){
    switch(giocoScelto){
    case 'forzaquattro':
      this.router.navigate(['/forzaQuattro']);
      break;
     
    case 'memory':
      this.router.navigate(['/memory']);
      break;

    default:
      this.router.navigate(['']);
    }
    
    
  }
}
