import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonDetailsComponent } from './components/person-details/person-details.component';
import { PersonsListComponent } from './components/persons-list/persons-list.component';

const routes: Routes = [
  {path: 'persons', component: PersonsListComponent},
  {path: 'persons/:id', component: PersonDetailsComponent},
  {path: '**', redirectTo: '/persons'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
