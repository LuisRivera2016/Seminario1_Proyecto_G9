import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from 'src/app/api-service.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { faFutbol } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faFlag } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-find-player',
  templateUrl: './find-player.component.html',
  styleUrls: ['./find-player.component.sass']
})
export class FindPlayerComponent implements OnInit {
  imageSrc: string = '';
  form! : FormGroup
  submitted = false;
  player: any = [];
  faFutbol = faFutbol;
  faUser = faUser;
  faFlag = faFlag;
  originalPath:String = ``;
  foto:any;
  constructor( private _cpd: ApiServiceService,
    private formBuilder:FormBuilder, private router: Router) { 
      this.form = this.formBuilder.group(
        {
          file: ['', Validators.required],
          foto: ['', Validators.required]
        },
      );

    }

  ngOnInit(): void {
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form!.controls;
  }

  onSubmit(): any {
    console.log("hola")
    console.log(this.form?.value)
  
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const f = {
      base64 : this.form.value.foto
    }


    this._cpd.getListaJugador(f).subscribe(
      (response: any) => {
        this.player = response.result
        this.foto = this.originalPath+this.player.Foto;
        console.log(this.player)
      },
      (error: HttpErrorResponse) => {
        //alert(error.message);
        console.log(error)
        
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
