import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) { }

   private ApiUrl = `http://balaceadorFinalito-1998129631.us-east-1.elb.amazonaws.com`;

  public registro(usuario: any): Observable<any> {
    return this.http.post<any>(`${this.ApiUrl}/registrar`,usuario);
  }

  public login(usuario:any):Observable<any>{
    return this.http.post<any>(`${this.ApiUrl}/login`,usuario);
  }

  public getUsuario(nombre:String):Observable<any>{
    return this.http.get<any>(`${this.ApiUrl}/obtenerUsuario/${nombre}`)
  }

}
