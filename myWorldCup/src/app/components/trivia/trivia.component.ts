import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/api-service.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.sass']
})
export class TriviaComponent implements OnInit {
  randomN: number = 0;
  constructor( private _cpd: ApiServiceService,
   private router: Router) {
    this.randomN = this.getRandomArbitrary();
    this.obtenerPregunta(1);
  }

  ngOnInit(): void {
   
  }


  obtenerPregunta(n:any):void{
    this._cpd.getQuestion(n).subscribe((res)=>{
      if(res!=null){
        console.log(res)

       }
 
     },(error: HttpErrorResponse) => {
       alert(error.message);
       console.log(error)
       
     });
  }

  getRandomArbitrary(): any {
    return Math.floor(Math.random() * (11 - 0) + 1);
  }


  /* reproducir() {
    const audio = new Audio('assets/Hola.mp3');
    audio.play();
  } */
}
