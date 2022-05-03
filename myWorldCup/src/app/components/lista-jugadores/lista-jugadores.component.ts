import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from 'src/app/api-service.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faFutbol } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-lista-jugadores',
  templateUrl: './lista-jugadores.component.html',
  styleUrls: ['./lista-jugadores.component.sass']
})
export class ListaJugadoresComponent implements OnInit {
  pais:any;
  players: any = [];
  traduccion: any =[];
  closeResult = '';
  form!: FormGroup;
  submitted: boolean | undefined;
  faFutbol = faFutbol;
  faUser = faUser;
  constructor(private activeRoute:ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private _cpd: ApiServiceService,
    private modalService: NgbModal) {
      this.pais=this.activeRoute.snapshot.paramMap.get('idPais');
      this.printJugadores(this.pais);
      
     }


  ngOnInit(): void {
    this.form = this.formBuilder.group(
      {
        lenguaje:[]
      }
     
    );
  }


  get f(): { [key: string]: AbstractControl } {
    return this.form!.controls;
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

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
     
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  onSubmit(jugador: any): any {

    this.submitted = true;
    if (this.form?.value.lenguaje==null) {
      alert("completar campos requeridos");
      return;
    }

   
    const datos =  {
      nombre: jugador,
      idioma: this.form?.value.lenguaje
    }

    this._cpd.traducirJugador(datos).subscribe((res)=>{
      if(res!=null){
        let dataUser = res.mensaje.split(","); 
        this.traduccion = dataUser

       }
 
     },(error: HttpErrorResponse) => {
       alert(error.message);
       
     });

   

  
  }

}
