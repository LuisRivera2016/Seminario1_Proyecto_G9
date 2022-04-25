import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Validation from 'src/app/providers/CustomValidators';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  imageSrc: string = '';
  form! : FormGroup
  submitted = false;
  constructor(public formBuilder:FormBuilder, private router: Router ) { 
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
    if (this.form?.invalid) {
      return;
    }
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

