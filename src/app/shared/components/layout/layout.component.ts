import { AuthService } from 'src/app/services';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, ButtonComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  logo: string = 'https://react.vristo.sbthemes.com/assets/images/logo.svg';

  constructor(public authService: AuthService) {}

  signOut() {
    this.authService.logout();
  }
}
