import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(
    private authenticationService: AuthenticationService,
  ) { }

  isUserAuthenticated = (): boolean => {
    return this.authenticationService.isLoggedIn();
  }
}

