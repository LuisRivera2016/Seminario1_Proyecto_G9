import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from 'src/app/api-service.service';
import { Router } from '@angular/router';
import Validation from 'src/app/providers/CustomValidators';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  imageSrc: string = '';
  form! : FormGroup
  submitted = false;
  constructor(
    private _cpd: ApiServiceService,
    private formBuilder:FormBuilder, private router: Router ) { 
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
       this.router.navigate(['/login']);
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

