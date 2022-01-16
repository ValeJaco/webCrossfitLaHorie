import {LOCALE_ID, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {UserDetailsComponent} from './pages/user-details/user-details.component';
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {MainContainerComponent} from './main-container/main-container.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatSidenavModule} from "@angular/material/sidenav";
import {SeanceDetailsComponent} from './pages/seance-details/seance-details.component';
import {MatListModule} from "@angular/material/list";
import {UsersListComponent} from './pages/users-list/users-list.component';
import {MatCardModule} from "@angular/material/card";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {CustomSnackBarComponent} from './components/custom-snack-bar/custom-snack-bar.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {RouterModule} from "@angular/router";
import {SeancesListComponent} from './pages/seances-list/seances-list.component';
import {CommonModule, DatePipe, registerLocaleData} from "@angular/common";
import {MAT_DATE_LOCALE} from "@angular/material/core";
import localeFr from '@angular/common/locales/fr';
import {AuthentificationComponent} from './pages/authentification/authentification.component';
import {AuthInterceptor} from "./security/auth.interceptor";
import {MatMenuModule} from "@angular/material/menu";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {AutoCompleteSearchUsersComponent} from './components/auto-complete-search-users/auto-complete-search-users.component';
import {PlanningListComponent} from './pages/planning-list/planning-list.component';
import {MatTableModule} from "@angular/material/table";
import { PlanningDetailsComponent } from './pages/planning-details/planning-details.component';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    UserDetailsComponent,
    MainContainerComponent,
    SeanceDetailsComponent,
    UsersListComponent,
    CustomSnackBarComponent,
    SeancesListComponent,
    AuthentificationComponent,
    AutoCompleteSearchUsersComponent,
    PlanningListComponent,
    PlanningDetailsComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    RouterModule,
    MatMenuModule,
    MatTooltipModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatTableModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: MAT_DATE_LOCALE, useValue: 'fr-FR'},
    {provide: LOCALE_ID, useValue: 'fr-FR'},
    //{provide: ErrorHandler, useClass: CustomErrorHandlerService},
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}
