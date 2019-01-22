import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URLSERVICIO } from '../../config/config';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';

@Injectable()
export class UsuarioService {
usuario: Usuario;
token: string;

  constructor( public _http: HttpClient, public _router: Router) { 
    this.cargarStorage();
  }

  crearUsuario( usuario: Usuario){
    let url = URLSERVICIO + '/usuario';

    return this._http.post( url, usuario )
    .map( ( resp: any ) => resp.usuarioDB );
  }

  
  ingresarUsuario( usuario: Usuario, recuerdame?:boolean ){
    let url = URLSERVICIO + '/login';
    
    return this._http.post( url, usuario )
    .map( ( resp: any ) => { 
      let usuario = JSON.stringify( resp.usuario );
      
      this.guardarStorage( resp.token, usuario );
    });
  }
  
  ingresarGoogle( token: string ){
    let url = URLSERVICIO + '/login/google';
    
    return this._http.post( url,{ token })
    .map( ( resp: any ) => {
      this.guardarStorage( resp.token, resp.usuarioDB );
      return true;
    })
  }
  
  isLogeado(){
    return ( this.token.length > 10 );
  }
  
  logOut(){
    this.resetStorage();
    this._router.navigate(['/login']);
  }

  guardarStorage( token: string, usuario ){
    this.token = token;
    this.usuario = usuario;
    
    localStorage.setItem('token', token );
    usuario = JSON.stringify( usuario );
    localStorage.setItem('usuario', usuario );
  }
  
  resetStorage(){
    this.token = '';
    this.usuario = null;

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  }

  cargarStorage(){
    let token = localStorage.getItem('token');
    if( token ){  
      this.token = token;
    }else{
      this.token = '';
    }    
  }
}
