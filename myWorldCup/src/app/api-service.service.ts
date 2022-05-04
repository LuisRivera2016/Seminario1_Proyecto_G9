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

  public getConfederaciones():Observable<any>{
    return this.http.get<any>(`${this.ApiUrl}/obtenerConfederacion`);
  }

  public getListaPaises(id:any):Observable<any>{
    return this.http.get<any>(`${this.ApiUrl}/api/selecciones/confederacion/${id}`);
  }

  public getListaJugadores(id:any):Observable<any>{
    return this.http.get<any>(`${this.ApiUrl}/api/jugadores/seleccion/${id}`);
  }


  public getListaJugador(base64:any):Observable<any>{
    return this.http.post<any>(`${this.ApiUrl}/api/jugadores/buscar`, base64);
  }

  public traducirJugador(jugador:any):Observable<any>{
    return this.http.post<any>(`${this.ApiUrl}/traducirDescripcion`, jugador);
  }

  public getQuestion(id:any):Observable<any>{
    return this.http.get<any>(`${this.ApiUrl}/api/trivia/pregunta/${id}`);
  }

  public subscribirse(email:any):Observable<any>{
    return this.http.post<any>(`${this.ApiUrl}/suscribirEmail`, email);
  }

  public LambdaFunction():Observable<any>{
    return this.http.get<any>(`https://3l4ikj1mji.execute-api.us-east-1.amazonaws.com/fase1`);
  }



}
