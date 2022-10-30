import { LandPageComponent } from './land-page/land-page.component';
import { FormCadastroVeiculoComponent } from './form-cadastro-veiculo/form-cadastro-veiculo.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DespesaComponent } from './despesa/despesa.component';

const routes: Routes = [
  { path: '', component: LandPageComponent },
  { path: 'cadastro-veiculo', component: FormCadastroVeiculoComponent },
  { path: 'adicionar-despesa/:idVeiculo', component: DespesaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
