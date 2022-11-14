import { Veiculo } from './../model/veiculo';
import { Component, OnInit } from '@angular/core';
import { Conta } from '../model/conta';
import { ActivatedRoute, Router } from '@angular/router';
import { VeiculoStorageService } from '../form-cadastro-veiculo/veiculo-storage.service';
import { VeiculoComponentService } from '../form-cadastro-veiculo/veiculo-component.service';

@Component({
  selector: 'app-land-page',
  templateUrl: './land-page.component.html',
  styleUrls: ['./land-page.component.css'],
  providers: [VeiculoStorageService],
})
export class LandPageComponent implements OnInit {
  public static conta = new Conta();
  conta: Conta = new Conta();
  veiculos?: Veiculo[];
  saldoMessage: String = '';
  valorSoma: number = 0;
  mostrarSoma = false;
  color = '#2286d2';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private veiculoStorageService: VeiculoStorageService,
    private veiculoComponentService: VeiculoComponentService
  ) {}

  ngOnInit(): void {
    this.veiculos = this.veiculoStorageService.getVeiculos();
    this.conta = LandPageComponent.conta;
  }

  expandirSoma() {
    this.mostrarSoma = true;
  }

  realizarSoma() {
    this.conta.saldo += this.valorSoma;
    this.mostrarSoma = false;
    this.valorSoma = 0;
  }

  messageSaldoEvent(event: String) {
    this.mostrarMessage(event);
  }

  mostrarMessage(message: String, sucess: Boolean = true): void {
    this.saldoMessage = message;
    if (sucess) {
      this.color = '#2286d2';
    } else {
      this.color = '#ff3f3f';
    }
    setTimeout(() => {
      this.saldoMessage = '';
    }, 3000);
  }

  currentStyles = {
    background: this.color,
  };

  adicionarDespesa(v: Veiculo) {
    this.router.navigate(['/adicionar-despesa', v?.id]);
  }

  editarVeiculo(v: Veiculo) {
    this.router.navigate(['/editar-veiculo', v?.id]);
  }

  onDelete(id: number) {
    let confirmation = window.confirm(
      'Você tem certeza que deseja excluir o veículo com o código: ' + id
    );
    if (!confirmation) {
      return;
    }

    let sucess: boolean = this.veiculoStorageService.delete(id);
    if (sucess) {
     /* this.veiculoComponentService
        .delete(id)
        .then((veiculo) => {
          this.mostrarMessage('O veículo foi removido com sucesso!');
        })
        .catch((e) => {
          this.mostrarMessage(e, false);
        });*/
    } else {
      this.mostrarMessage('Opps! Não foi possível remover o veículo!', false);
    }
    this.veiculos = this.veiculoStorageService.getVeiculos();
  }

  ngOnDestroy(): void {
    LandPageComponent.conta = this.conta;
  }
}
