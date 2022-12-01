import { LandPageComponent } from './land-page/land-page.component';
import { FormCadastroVeiculoComponent } from './form-cadastro-veiculo/form-cadastro-veiculo.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DespesaComponent } from './despesa/despesa.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', component: LandPageComponent },
  { path: 'cadastro-veiculo', component: FormCadastroVeiculoComponent },
  { path: 'editar-veiculo/:id', component: FormCadastroVeiculoComponent },
  { path: 'adicionar-despesa/:id', component: DespesaComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
