import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlterarMedico } from './alterar-medico';

describe('AlterarMedico', () => {
  let component: AlterarMedico;
  let fixture: ComponentFixture<AlterarMedico>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlterarMedico],
    }).compileComponents();

    fixture = TestBed.createComponent(AlterarMedico);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
