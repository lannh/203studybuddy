import { Component, ElementRef, Inject, OnInit, Renderer2, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm!: FormGroup;
  rememberMe = false;
  submitted = false;

  constructor(
    
    @Inject(DOCUMENT) private document: Document,
    private authenticationService: AuthenticationService, 
    private renderer: Renderer2) {       
    }
    

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });


  }

  get f() { return this.loginForm.controls; }

  public onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) 
    {
      return;
    }

    this.authenticationService.login(
      this.loginForm.get('email')!.value,
      this.loginForm!.get('password')!.value
    );
  }
}
