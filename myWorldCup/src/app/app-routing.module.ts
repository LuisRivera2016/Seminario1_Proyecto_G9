import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfederationMenuComponent } from './components/confederation-menu/confederation-menu.component';
import { CountryComponent } from './components/country/country.component';
import { HomeComponent } from './components/home/home.component';
import { ListaJugadoresComponent } from './components/lista-jugadores/lista-jugadores.component';
import { LobbyComponent } from './components/lobby/lobby.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
const routes: Routes = [
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'lobby',
    component:LobbyComponent
  },
  {
    path:'confederations',
    component:ConfederationMenuComponent
  },
  {
    path:'Listconfederation/:conf',
    component:CountryComponent
  },
  {
    path:'Pais/:idPais',
    component:ListaJugadoresComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'',
    pathMatch:'full',
    redirectTo:'home'
  },
  {
    path:'**',
    pathMatch:'full',
    component:NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
