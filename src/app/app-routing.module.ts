import { LandPageComponent } from './land-page/land-page.component';
import { FormCadastroVeiculoComponent } from './form-cadastro-veiculo/form-cadastro-veiculo.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: LandPageComponent },
  { path: 'cadastro-veiculo', component: FormCadastroVeiculoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
