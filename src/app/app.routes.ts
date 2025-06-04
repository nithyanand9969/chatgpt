import { Routes } from '@angular/router';



export const routes: Routes = [
 { path: '', redirectTo: 'chat', pathMatch: 'full' },
  { path: 'chat', loadComponent: () => import('./chat/chat').then(m => m.Chat) },
  { path: 'login', loadComponent: () => import('./auth/login/login').then(m => m.Login) },
{ path: 'register', loadComponent: () => import('./auth/register/register').then(m => m.Register) }
];
