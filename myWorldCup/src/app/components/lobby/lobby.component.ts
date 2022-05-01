import { Component, OnInit } from '@angular/core';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faMailBulk } from '@fortawesome/free-solid-svg-icons';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { ApiServiceService } from 'src/app/api-service.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.sass']
})
export class LobbyComponent implements OnInit {
  faTrophy = faTrophy;
  faUser = faUser;
  faMailBulk = faMailBulk;
  faUserAlt = faUserAlt;
  userLog:any;
  name:any;
  username:any;
  email: any;
  puntos: any;
  originalPath:String = ``;
  foto:any;
  constructor(private _cpd: ApiServiceService) {
    this.userLog = localStorage.getItem('user');
    this.getUsuario(this.userLog);
   }
 

  ngOnInit(): void {
  }

  getUsuario(name:any):void{
    console.log('home')
    this._cpd.getUsuario(name).subscribe((resp: any) => {
      
      if(resp!=null){
        this.name = resp.name;
        this.username = resp.user; 
        this.foto = this.originalPath+resp.foto;
        this.email =resp.email;
        this.puntos = resp.puntos;
      }
      console.log(resp);
     
    });
  }

}
