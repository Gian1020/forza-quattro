import { Routes } from '@angular/router';
import { ForzaQuattro } from './forza-quattro/forza-quattro';
import { Board } from './memory/board';
import { Home } from './home/home';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'forzaQuattro', component: ForzaQuattro },
    { path: 'memory', component: Board }

];
