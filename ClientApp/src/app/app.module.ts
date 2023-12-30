import { BrowserModule } from '@angular/platform-browser';
import { NgModule, SecurityContext } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { JwtModule } from "@auth0/angular-jwt";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule} from '@angular/material/progress-spinner';


import { MarkdownModule } from 'ngx-markdown';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';


import { AuthGuard } from './helpers/auth.guard';
import { TokenInterceptor } from './helpers/token.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertComponent } from './components/alert/alert.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { AuthStateGuard } from './helpers/authstate.guard';
import { HeaderComponent } from './components/header/header.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { StudyMaterialsComponent } from './components/study-materials/study-materials.component';
import { TutorialContentComponent } from './components/tutorial-content/tutorial-content.component';
import { HighlightService } from './services/SyntaxHighlighterService';
import { ArticlesFilterPipe } from './helpers/articles-filter.pipe';
import { TrimArticlesPipe } from './helpers/trim-articles.pipe';
import { SavedPagesComponent } from './components/saved-pages/saved-pages.component';
import { ChatbotBtnComponent } from './components/chatbot-btn/chatbot-btn.component';
import { ChatbotDialogComponent } from './components/chatbot-dialog/chatbot-dialog.component';
import { MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS, MatDialogConfig, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ChatbotPageComponent } from './components/chatbot-page/chatbot-page.component';
import { UploadTrainingFilesComponent } from './components/upload-training-files/upload-training-files.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { AdminGuard } from './helpers/admin.guard';



export function tokenGetter() { 
  return localStorage.getItem("jwt"); 
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AlertComponent,
    PagenotfoundComponent,
    HeaderComponent,
    SidenavComponent,
    StudyMaterialsComponent,
    TutorialContentComponent,
    ArticlesFilterPipe,
    TrimArticlesPipe,
    SavedPagesComponent,
    ChatbotBtnComponent,
    ChatbotDialogComponent,
    ChatbotPageComponent,
    UploadTrainingFilesComponent,
    ForbiddenComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: 'forbidden', component: ForbiddenComponent },
      {
        path: '',
        component: StudyMaterialsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'articles/:title',
        component: TutorialContentComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'saved-articles',
        component: SavedPagesComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'upload-training-files',
        component: UploadTrainingFilesComponent,
        canActivate: [AuthGuard, AdminGuard],
      },
      {
        path: 'chatbot',
        component: ChatbotPageComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [AuthStateGuard],
      },
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [AuthStateGuard],
      },
      { path: '**', pathMatch: 'full', 
        component: PagenotfoundComponent },
    ]),
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatGridListModule,
    MatDividerModule,
    MatListModule,
    MatTabsModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["localhost:5001","https://203studybuddy.azurewebsites.net/"],
        disallowedRoutes: []
      }
    }),
    MarkdownModule.forRoot(),
    MarkdownModule.forChild(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    HighlightService,
    {
      provide: MatDialogRef,
      useValue: {}
    },
    {
      provide: MAT_DIALOG_DEFAULT_OPTIONS, 
      useValue: {
        backdropClass: 'cdk-overlay-transparent-backdrop',
        hasBackdrop: false,

      }
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

