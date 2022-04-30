import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  faCamera = faCamera;
  formularioLogin: FormGroup;
  constructor(
    public formulario:FormBuilder,private router: Router) { 

    this.formularioLogin=this.formulario.group({
      user:"",
      password:""
      
  });

  }

  ngOnInit(): void {
  }

  Login():any{
    
    console.log(this.formularioLogin.value);
    console.log(this.formularioLogin.value.user)
    /* this._cpd.login(this.formularioLogin.value).subscribe(
      (response: any) => {
       if(response.alerta){
        localStorage.setItem('user', this.formularioLogin.value.user) 
        this.router.navigate(['home'])
       
      }else{

      }

      alert(response.mensaje);
       
        
        
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        
      }
    ); */

  }

}