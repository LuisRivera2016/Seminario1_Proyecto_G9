import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from 'src/app/api-service.service';

@Component({
  selector: 'app-confederation-menu',
  templateUrl: './confederation-menu.component.html',
  styleUrls: ['./confederation-menu.component.sass']
})
export class ConfederationMenuComponent implements OnInit {
  confederaciones: any = [];
  
  constructor(private _cpd: ApiServiceService) {
    this.printConfederaciones();
  }

  ngOnInit(): void {
  }

  printConfederaciones():void{
    this._cpd.getConfederaciones().subscribe((res)=>{
      if(res!=null){
         this.confederaciones = res.result;
         console.log(this.confederaciones);
       }
 
     },(error: HttpErrorResponse) => {
       alert(error.message);
       
     });
  }
}
