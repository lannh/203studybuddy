import { Component, Input } from '@angular/core';
import { FlowdataService } from 'src/app/services/ArticlesDataService';
import { Article } from './ArticleModel';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpUrlEncodingCodec } from '@angular/common/http';
import { HighlightService } from 'src/app/services/SyntaxHighlighterService';
import { MarkdownService } from 'ngx-markdown';

@Component({
  selector: 'app-tutorial-content',
  templateUrl: './tutorial-content.component.html',
  styleUrls: ['./tutorial-content.component.css']
})
export class TutorialContentComponent {

  codec = new HttpUrlEncodingCodec;

  article!: Article | undefined;
  title!: string;
  highlighted: Boolean = false;

  data = '```math $\\color{red}{3/~Java~Bytecode:}$ ```';

  constructor(
    private flowDataService: FlowdataService,
    private router: Router,
    private _Activatedroute:ActivatedRoute,
    private highlightService: HighlightService,
    private mdService: MarkdownService
  ) { 
    console.log(this.mdService.parse(this.data))
  }

  ngOnInit(): void {
    let param = this._Activatedroute.snapshot.params['title'];
    this.title = this.codec.decodeValue(param)

    this.flowDataService.getArticle(this.title);
    this.flowDataService.articleToDisplay.subscribe(article => {
      if(article !== undefined)
      {
        console.log(this.mdService.parse(this.data))
        console.log(article.description)
        console.log(this.mdService.parse(article.description))
        article.description =  this.mdService.parse(article.description);
      }
      this.article = article;
    });
    console.log(this.article)
    if((this.article===undefined || this.article===null) && this.flowDataService.articles.length!==0) {
      this.router.navigate(['**']);
    }
  }

  ngAfterViewChecked() {
    if (this.article && !this.highlighted) {
      this.highlightService.highlightAll();
      this.highlighted = true;
    }
  }
}
