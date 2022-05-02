import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from 'src/app/api-service.service';

@Component({
  selector: 'app-lista-jugadores',
  templateUrl: './lista-jugadores.component.html',
  styleUrls: ['./lista-jugadores.component.sass']
})
export class ListaJugadoresComponent implements OnInit {
  pais:any;
  players: any = [];
  constructor(private activeRoute:ActivatedRoute,
    private router: Router,
    private _cpd: ApiServiceService) {
      this.pais=this.activeRoute.snapshot.paramMap.get('idPais');
      this.printJugadores(this.pais);
     }


  ngOnInit(): void {
  }

  printJugadores(confederacion:any):void{
    console.log(confederacion)
    this._cpd.getListaJugadores(confederacion).subscribe((res)=>{
      if(res!=null){
        this.players = res.result;
        console.log(res);
       }
 
     },(error: HttpErrorResponse) => {
       alert(error.message);
       
     });
  }

}
