import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { CountdownComponent } from './components/countdown/countdown.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { LobbyComponent } from './components/lobby/lobby.component';
import { NavbarHomeComponent } from './components/navbar-home/navbar-home.component';
import { DropdownNavbarComponent } from './dropdown-navbar/dropdown-navbar.component';
import { ConfederationMenuComponent } from './components/confederation-menu/confederation-menu.component';
import { BackMenuComponent } from './components/back-menu/back-menu.component';
import { CountryComponent } from './components/country/country.component';
import { ListaJugadoresComponent } from './components/lista-jugadores/lista-jugadores.component';
import { FindPlayerComponent } from './components/find-player/find-player.component';
import { TriviaComponent } from './components/trivia/trivia.component';
import { TopScoreComponent } from './components/top-score/top-score.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent,
    NavBarComponent,
    CountdownComponent,
    RegisterComponent,
    LoginComponent,
    LobbyComponent,
    NavbarHomeComponent,
    DropdownNavbarComponent,
    DropdownNavbarComponent,
    ConfederationMenuComponent,
    BackMenuComponent,
    CountryComponent,
    ListaJugadoresComponent,
    FindPlayerComponent,
    TriviaComponent,
    TopScoreComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FontAwesomeModule, 
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
