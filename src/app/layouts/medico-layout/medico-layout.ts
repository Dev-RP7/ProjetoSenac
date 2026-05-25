import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-medico-layout',
  standalone: true,
  imports: [RouterOutlet, RouterLinkWithHref, RouterLinkActive],
  templateUrl: './medico-layout.html',
  styleUrls: ['./medico-layout.scss'],
})
export class MedicoLayout {}


