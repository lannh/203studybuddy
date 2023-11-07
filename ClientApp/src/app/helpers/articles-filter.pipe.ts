import { Pipe, PipeTransform } from '@angular/core';
import { Article } from '../components/tutorial-content/ArticleModel';

@Pipe({ name: 'articlesFilter' })
export class ArticlesFilterPipe implements PipeTransform {
  /**
   * Pipe filters the list of elements based on the search text provided
   *
   * @param items list of elements to search in
   * @param searchText search string
   * @returns list of elements filtered by search text or []
   */
  transform(articles: Article[], searchText: string): any[] {
    if (!articles) {
      return [];
    }
    if (!searchText) {
      return articles;
    }
    searchText = searchText.toLocaleLowerCase();

    return articles.filter(article => {
      return article.title.toLocaleLowerCase().includes(searchText) || 
             article.description.toLowerCase().includes(searchText);
    });
  }
}