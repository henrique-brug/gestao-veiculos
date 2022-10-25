import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCadastroVeiculoComponent } from './form-cadastro-veiculo.component';

describe('FormCadastroVeiculoComponent', () => {
  let component: FormCadastroVeiculoComponent;
  let fixture: ComponentFixture<FormCadastroVeiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCadastroVeiculoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormCadastroVeiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
