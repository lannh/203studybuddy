import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Article, RawArticle } from '../tutorial-content/ArticleModel';
import { FlowdataService } from 'src/app/services/ArticlesDataService';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpUrlEncodingCodec } from '@angular/common/http';
import { AlertService } from 'src/app/services/alert.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-saved-pages',
  templateUrl: './saved-pages.component.html',
  styleUrls: ['./saved-pages.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class SavedPagesComponent {

  codec = new HttpUrlEncodingCodec;

  savedArticles: Article[] = [];


  tabs: string[] = [];
  searchValue: string = '';

  constructor(
    private authenticationService: AuthenticationService,
    private flowDataService: FlowdataService,
    private router: Router,
    private alertService: AlertService,
    private cdRef: ChangeDetectorRef
    //private weatherClient: WeatherClient
  ) { }

  ngOnInit(): void {
    console.log("ng oninit")

    if(this.flowDataService.articles.length === 0){
      console.log("get data from service")
      this.flowDataService._articles
        .subscribe({
          next: (data) => {
            this.flowDataService._savedArticles
              .subscribe({          
                next: (savedArticlesdata) => {
                  this.flowDataService.savedArticles = savedArticlesdata;
                  let tmpArticles = this.flowDataService.checkForSavedArticles(data);
                  this.flowDataService.articles = tmpArticles;
                  this.savedArticles = tmpArticles.filter(article => article.isSave);
                },
                error: (err: HttpErrorResponse) => {
                  console.log(err)
                  this.alertService.error(err.error);
                  this.savedArticles = [];
                }
            })

          },
          error: (err: HttpErrorResponse) => {
            console.log(err)
            this.alertService.error(err.error);
            this.savedArticles = [];
          }
        });
    
    }
    else
    {
      console.log(this.flowDataService.articles)

      let articles = this.flowDataService.articles;

      this.savedArticles = articles.filter(article => article.isSave);
    }
    this.tabs = ["All","Java", "OOP", "Labs", "Projects"];
    
  }

  logOut(): void {
    this.authenticationService.logout();
  }

  isUserAuthenticated = (): boolean => {
    return this.authenticationService.isLoggedIn();
  }

  getArticlesFrom(label:string){
    if(label==="All")
      return this.savedArticles.slice();

    return this.savedArticles.filter(post => post.label == label);
  }

  changeSaveStatus(post: Article) {
    var index = this.savedArticles.findIndex(article => article.title===post.title);
    this.savedArticles[index].isSave = !this.savedArticles[index].isSave;

    this.savedArticles = this.savedArticles.filter(article => article.isSave);
  }

    //on click event
  onArticleClick(newArticle: Article) {
      console.log(newArticle);
  
      let param = this.codec.encodeValue(newArticle.title);

      //go to the article detail page
      this.router.navigate(['/articles', param]);
  }
}

