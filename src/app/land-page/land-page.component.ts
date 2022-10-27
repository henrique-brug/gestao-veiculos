import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-land-page',
  templateUrl: './land-page.component.html',
  styleUrls: ['./land-page.component.css'],
})
export class LandPageComponent implements OnInit {
  valor: number = 0;
  mostrarSoma = false;

  constructor() {}

  ngOnInit(): void {}

  expandirSoma() {
    this.mostrarSoma = true;
  }

  realizarSoma() {
    this.mostrarSoma = false;
  }
}
