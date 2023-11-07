import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Article, RawArticle } from '../tutorial-content/ArticleModel';
import { FlowdataService } from 'src/app/services/ArticlesDataService';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpUrlEncodingCodec } from '@angular/common/http';
import { AlertService } from 'src/app/services/alert.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-study-materials',
  templateUrl: './study-materials.component.html',
  styleUrls: ['./study-materials.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class StudyMaterialsComponent {

  codec = new HttpUrlEncodingCodec;

  articles: Article[] = [];

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
                  this.articles = tmpArticles;
                  this.savedArticles = this.articles.filter(article => article.isSave);
                },
                error: (err: HttpErrorResponse) => {
                  console.log(err)
                  this.alertService.error(err.error);
                  this.articles = [];
                  this.savedArticles = [];
                }
            })

          },
          error: (err: HttpErrorResponse) => {
            console.log(err)
            this.alertService.error(err.error);
            this.articles = [];
            this.savedArticles = [];
          }
        });
    
    }
    else
    {
      console.log(this.flowDataService.articles)

      this.articles = this.flowDataService.articles;

      this.savedArticles = this.articles.filter(article => article.isSave);
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
      return this.articles.slice();

    return this.articles.filter(post => post.label == label);
  }

  changeSaveStatus(post: Article) {
    var index = this.articles.findIndex(article => article.title===post.title);
    this.articles[index].isSave = !this.articles[index].isSave;

    this.savedArticles = this.articles.filter(article => article.isSave);
    this.flowDataService.articles = this.articles;
  }

    //on click event
  onArticleClick(newArticle: Article) {
      console.log(newArticle);
  
      let param = this.codec.encodeValue(newArticle.title);

      //go to the article detail page
      this.router.navigate(['/articles', param]);
  }
}

