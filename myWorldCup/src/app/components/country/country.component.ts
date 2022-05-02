import { HttpErrorResponse } from '@angular/common/http';
import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiServiceService } from 'src/app/api-service.service';
@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.sass']
})
export class CountryComponent implements OnInit {
  conf:any;
  countries: any = [];
  constructor(private activeRoute:ActivatedRoute,
    private router: Router,
    private _cpd: ApiServiceService) {
      this.conf=this.activeRoute.snapshot.paramMap.get('conf');
      this.printPaises(this.conf);
     }


  ngOnInit(): void {
  }

  printPaises(confederacion:any):void{
    this._cpd.getListaPaises(confederacion).subscribe((res)=>{
      if(res!=null){
        this.countries = res.result;
        console.log(this.conf)
        console.log(res);
       }
 
     },(error: HttpErrorResponse) => {
       alert(error.message);
       
     });
  }

}
