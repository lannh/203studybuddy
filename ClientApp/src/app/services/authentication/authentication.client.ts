
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticatedResponse, LoginModel, RegisterModel } from 'src/app/components/login/LoginModel';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationClient {
  constructor(private http: HttpClient) { }

  public login(credentials: LoginModel): Observable<AuthenticatedResponse> {
    return this.http.post<AuthenticatedResponse>("https://localhost:5001/api/auth/login", credentials, {
      headers: new HttpHeaders({ "Content-Type": "application/json"})
    });
  }

  public register(newUser: RegisterModel): Observable<AuthenticatedResponse> {
    return this.http.post<AuthenticatedResponse>("https://localhost:5001/api/auth/register", newUser, {
      headers: new HttpHeaders({ "Content-Type": "application/json"})
    });
  }
}