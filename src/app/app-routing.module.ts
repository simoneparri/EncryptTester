import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TesterComponent } from './view/tester/tester.component';
import { HomeComponent } from './view/home/home.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'home', component: HomeComponent },
  { path: 'tester', component: TesterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
