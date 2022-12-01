import { Constants } from './../util/constantes';
import { ContaService } from './../saldo/conta.service';
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
  conta: Conta = new Conta(0, 0);
  veiculos?: Veiculo[];
  saldoMessage: String = '';
  valorSoma: number = 0;
  mostrarSoma = false;
  color = '#2286d2';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private veiculoStorageService: VeiculoStorageService,
    private veiculoComponentService: VeiculoComponentService,
    private contaService: ContaService
  ) {}

  ngOnInit(): void {
    this.veiculos = this.veiculoStorageService.getVeiculos();
    this.getConta();

    this.veiculoComponentService.getAllVeiculos().subscribe(
      (data) => {
        this.veiculos = data;
        this.veiculoStorageService.setVeiculos(data);
      },
      (error) => {
        this.veiculos = this.veiculoStorageService.getVeiculos();
        this.mostrarMessage(
          'Não foi possível atualizar a lista de veículos! Sua lista pode estar desatualizada!',
          false
        );
      }
    );
  }

  getConta(): void {
    this.contaService.getById(Constants.CONTA_KEY).subscribe(
      (data) => {
        this.conta = data[0];
      },
      (error) => {
        this.mostrarMessage('Não foi possível recuperar a conta!', false);
      }
    );
  }

  expandirSoma() {
    this.mostrarSoma = true;
  }

  realizarSoma() {
    this.conta.saldo += this.valorSoma;
    this.contaService.patch(this.conta).subscribe(
      (data: Conta) => {
        this.mostrarSoma = false;
        this.valorSoma = 0;
      },
      (error) => {
        this.veiculos = this.veiculoStorageService.getVeiculos();
        this.mostrarMessage('Não foi possível recuperar a conta!', false);
      }
    );
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
    this.currentStyles = {
      background: this.color,
    };
    setTimeout(() => {
      this.saldoMessage = '';
    }, 4000);
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

    this.veiculoComponentService
      .delete(id)
      .then((veiculo) => {
        this.veiculoStorageService.delete(id);
        this.veiculos = this.veiculoStorageService.getVeiculos();
        this.mostrarMessage('O veículo foi removido com sucesso!');
      })
      .catch((e) => {
        this.mostrarMessage(e, false);
      });
  }
}
