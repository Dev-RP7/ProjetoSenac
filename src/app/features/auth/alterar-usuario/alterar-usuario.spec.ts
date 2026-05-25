import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarUsuario } from './alterar-usuario';

describe('AlterarUsuario', () => {
  let component: AlterarUsuario;
  let fixture: ComponentFixture<AlterarUsuario>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlterarUsuario],
    }).compileComponents();

    fixture = TestBed.createComponent(AlterarUsuario);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
