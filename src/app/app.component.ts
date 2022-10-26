import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Gestão Veículos';
  currentDate: Date;

  constructor() {
    this.currentDate = new Date();
  }

  ngOnInit(): void {
    setInterval(() => {
      this.currentDate = new Date();
    }, 1000);
  }
}
