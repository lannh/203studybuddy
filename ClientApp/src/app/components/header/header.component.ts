import { Component, EventEmitter, Output } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  searchValue = "";

  @Output() public sidenavToggle = new EventEmitter();


  constructor(
    private authenticationService: AuthenticationService
    ){}


  toggleSideBar() {
  }

  logOut(): void {
    this.authenticationService.logout();
  }

  public onToggleSidenav = () => { 
    this.sidenavToggle.emit();
  }
}
