
import { AuthenticationService } from '../services/authentication/authentication.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthStateGuard  {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log(this.authService.isLoggedIn());
    if (!this.authService.isLoggedIn()) {
      return true;
    }

    this.router.navigate([""]);
    return false;
  }
}