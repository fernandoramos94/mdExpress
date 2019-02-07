import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { 
    path: 'inside', 
    loadChildren: './pages/inside/inside.module#InsidePageModule',
    canActivate: [AuthGuardService]
  },
  // { path: 'categories', loadChildren: './categories/categories.module#CategoriesPageModule' },
  { path: 'categories/:idLocal/:idZone', 
    loadChildren: './pages/categories/categories.module#CategoriesPageModule',
    canActivate: [AuthGuardService]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
