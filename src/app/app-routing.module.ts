import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateTopologyComponent } from './create-topology/create-topology.component';

const routes: Routes = [
  {
    path:'',
    component:CreateTopologyComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
