import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard {

  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(this.authService.isUserAdmin())
      return true;
      
    this.router.navigate(['/forbidden'], { queryParams: { returnUrl: state.url }});
    return false;
  }
}