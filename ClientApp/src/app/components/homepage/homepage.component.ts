
//import { WeatherClient } from './../clients/weather.client';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  //public weather: Observable<any> = this.weatherClient.getWeatherData();

  constructor(
    private authenticationService: AuthenticationService,
    //private weatherClient: WeatherClient
  ) { }

  ngOnInit(): void { }

  logOut(): void {
    this.authenticationService.logout();
  }

  isUserAuthenticated = (): boolean => {
    return this.authenticationService.isLoggedIn();
  }

}