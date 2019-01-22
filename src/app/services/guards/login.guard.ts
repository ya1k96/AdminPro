import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';
import { swal } from '../../sweet/sweetFile';
@Injectable()
export class LoginGuard implements CanActivate {
  constructor( public _serviceusuario: UsuarioService,
               public _router: Router ){ }
  
  canActivate(): boolean {
    console.log(this._serviceusuario.isLogeado());
    if(this._serviceusuario.isLogeado()){
      return true;
    }else{
      this._router.navigate(['/login']);
      swal("Invalido", "Debes ingresar" , "warning");
      return false;
    }
  }
}
