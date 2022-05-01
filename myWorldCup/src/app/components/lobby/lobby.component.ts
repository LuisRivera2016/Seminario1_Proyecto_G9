import { Component, OnInit } from '@angular/core';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faMailBulk } from '@fortawesome/free-solid-svg-icons';
import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import Validation from 'src/app/providers/CustomValidators';
import { ApiServiceService } from 'src/app/api-service.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  closeResult = '';
  form! : FormGroup
  imageSrc: string = '';
  submitted = false;
  constructor(private _cpd: ApiServiceService,
    private modalService: NgbModal,
    private formBuilder:FormBuilder) {
    this.userLog = localStorage.getItem('user');
    this.getUsuario(this.userLog);

    this.form = this.formBuilder.group(
      {
        name: ['', Validators.required],
        user: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20)
          ]
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.email
          ]
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(40)
          ]
        ],
        cPassword: ['', Validators.required],
        file: ['', Validators.required],
        foto: ['', Validators.required]
      },
      {
        validators: [Validation.match('password', 'cPassword')]
      }
    );

   }
 

  ngOnInit(): void {
  }


  get f(): { [key: string]: AbstractControl } {
    return this.form!.controls;
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

  onSubmit(): any {
    console.log("hola")
    console.log(this.form?.value)
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    this._cpd.registro(this.form.value).subscribe(
      (response: any) => {
        
       alert(response.alerta);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        
      }
    );
  }

  onFileChange(event:any) {
    const reader = new FileReader();
    
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
   
        this.imageSrc = reader.result as string;
        let base_image = reader.result?.toString().split(",",2);
      
        if (base_image){
          this.form.patchValue({
            foto: base_image[1]
          });
        }  
      
   
      };
   
    }
  }
  onReset(): void {
    this.submitted = false;
    this.form?.reset();
  }

}
