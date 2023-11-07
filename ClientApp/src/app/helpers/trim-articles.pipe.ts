import { Pipe, PipeTransform } from '@angular/core';
import { Article } from '../components/tutorial-content/ArticleModel';

@Pipe({ name: 'trimArticles' })
export class TrimArticlesPipe implements PipeTransform {
  transform(articles: Article[]): any[] {
    let newList: Article[] = articles.map(article => 
      new Article(undefined, article.label, article.title, 
        //cut down the description to display in tab view
        article.description.substring(0, 150), article.isSave));
        
    return newList;
  }
}