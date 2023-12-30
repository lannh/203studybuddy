//used to pass data from main dashboard page to detail page
import { Injectable } from '@angular/core';
import { Article, RawArticle } from '../components/tutorial-content/ArticleModel';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ReplaySubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FlowdataService {

  _articles!: Observable<RawArticle[]>;
  _savedArticles!: Observable<string[]>;

  articleToDisplay = new ReplaySubject<Article | undefined>();

  savedArticles: string[] = [];
  articles: Article[] = [];/*[
    {label: "Java", title: 'Introduction to Java Programming Language', description: "Brief description", isSave: true},
    {label: "Java", title: 'Data Types and Operators', description: "Brief description", isSave: false},
    {label: "Java", title: 'Conditionals and Loops', description: "Brief description", isSave: true},
    {label: "Java", title: 'File I/O', description: "Brief description", isSave: false},

    {label: "OOP", title: '1', description: "Brief description", isSave: false},
    {label: "OOP", title: '2', description: "Brief description", isSave: true},
    {label: "OOP", title: '3', description: "Brief description", isSave: false},

    {label: "Labs", title: '1', description: "Brief description", isSave: true},
    {label: "Labs", title: '2', description: "Brief description", isSave: false},
    {label: "Labs", title: '3', description: "Brief description", isSave: false},
  
    {label: "Projects", title: '1', description: "Brief description", isSave: false},
    {label: "Projects", title: '2', description: "Brief description", isSave: false},

  ];*/

  private rawDataUrl = environment.articlesApiUrl;  // URL to web api
  private savedArticlesURL = environment.savedArticlesApiUrl;  // URL to web api


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { 
    this._articles = this.getArticlesDataFromServer();
    this._savedArticles = this.getSavedArticlesFromServer();
  }

  getArticlesDataFromServer(): Observable<RawArticle[]> {
    console.log("http request for articles")
    return this.http.get<RawArticle[]>(this.rawDataUrl);
  }

  getSavedArticlesFromServer(): Observable<string[]> {
    console.log("http request for saved articles")
    return this.http.get<string[]>(this.savedArticlesURL);
  }

  postASavedArticle(article: Article): Observable<Number> {
    console.log(article)
    return this.http.put<Number>(this.savedArticlesURL, article);
  }

  saveArticle(article: Article){
    localStorage.setItem('article', JSON.stringify(article))
  }
  getArticle(title: string) {
    let data: Article | undefined = undefined;

    console.log("in get article")
    if(this.articles.length !== 0){
      data = this.articles.find(article => article.title===title);
      this.articleToDisplay.next(data);
    }
    else 
      this._articles.subscribe(allArticles =>
      {
        console.log("articles.length != 0");

        this.articles = this.checkForSavedArticles(allArticles);

        data = this.articles.find(article => article.title===title);
        this.articleToDisplay.next(data); 
      }); 
    

    //let data = localStorage.getItem('article');
    //return data;
  }

  checkForSavedArticles(data: RawArticle[]) : Article[]
  {
    //console.log(data);
    let newList: Article[] = data.map(article => {
      let newArticle = new Article(article);
      if(this.savedArticles.indexOf(article.id) >=0)
        newArticle.isSave = true;
      return newArticle;
    });
    return newList;
  }

  clearArticle() {
    localStorage.removeItem('article');
  }
}
