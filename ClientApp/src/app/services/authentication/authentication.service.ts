import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationClient } from '../authentication/authentication.client';
import { AuthenticatedResponse, LoginModel, RegisterModel } from 'src/app/components/login/LoginModel';
import { HttpErrorResponse } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertService } from '../alert.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private tokenKey = 'jwt';
  invalidLogin: boolean = true;
  loading = false;

  constructor(
    private authenticationClient: AuthenticationClient,
    private router: Router,
    private jwtHelper: JwtHelperService,
    private alertService: AlertService
  ) { }

  public login(email: string, password: string): void {
    const credentials: LoginModel = {email:email, password:password};
    this.authenticationClient 
      .login(credentials)
      .subscribe({
        next: (response: AuthenticatedResponse) => {
          const token = response.token;
          localStorage.setItem("jwt", token); 
          this.invalidLogin = false; 
          this.router.navigate(["/"]);
        },
        error: (err: HttpErrorResponse) => {
          this.alertService.error("Invalid email or password.");
          this.loading = false;
          //console.log(err.error.errors)
      }
      });
  }

  public register(username: string, email: string, password: string): void {
    const newUser: RegisterModel = {email:email, username:username ,password:password};

    this.authenticationClient
      .register(newUser)
      .subscribe({
        next: (_) => {
          //this.alertService.success('Registration successful', true);
          this.alertService.success('Registration successful', true);
          this.router.navigate(['/login']);
      },
        error: (err: HttpErrorResponse) => {
          console.log(err)
          this.alertService.error(err.error);
          this.loading = false;
          //console.log(err.error.errors)
      }})
  }

  public logout() {
    localStorage.removeItem("jwt");
    this.router.navigate(['/login']);
  }

  public isLoggedIn(): boolean {
    let token = localStorage.getItem("jwt");
    return token!=null && !this.jwtHelper.isTokenExpired(token);
  }

  public getToken(): string | null {
    return this.isLoggedIn() ? localStorage.getItem(this.tokenKey) : null;
  }

  public isUserAdmin = (): boolean => {
    const token = localStorage.getItem("jwt");
    if(token===null)
      return false;

    const decodedToken = this.jwtHelper.decodeToken(token);
    const roles = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
    return roles && roles.includes('Admin');
  }
}