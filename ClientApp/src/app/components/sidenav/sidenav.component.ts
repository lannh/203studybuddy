import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';


@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {

  @Output() sidenavClose = new EventEmitter();

  @ViewChild('sidenav')
  sidenav!: MatSidenav; 

  open = false;

  constructor(private authenticationService: AuthenticationService) 
  {}

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }
  logOut(): void {
    this.authenticationService.logout();
  }
  
  isAdmin() : boolean{
    return this.authenticationService.isUserAdmin()
  }
}
