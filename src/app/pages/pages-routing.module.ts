import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewDetailsComponent } from './components/view-details/view-details.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'details',
    pathMatch: 'full'
  },
  {
    path: 'details',
    component: ViewDetailsComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
