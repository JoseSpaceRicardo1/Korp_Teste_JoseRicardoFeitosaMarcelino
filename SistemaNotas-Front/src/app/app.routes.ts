import { Routes } from '@angular/router';
import { ProdutosComponent } from './pages/produtos/produtos';

export const routes: Routes = [
  { path: 'produtos', component: ProdutosComponent },
  { path: '', redirectTo: '/produtos', pathMatch: 'full' }
];