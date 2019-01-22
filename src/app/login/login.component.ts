import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { resolve } from 'url';
import { Location } from "@angular/common";

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
recuerdame: boolean = false;
auth2: any;
  constructor( public router: Router, 
               public _serviceusuario: UsuarioService,
               public _location: Location ) { }

  ngOnInit() {
    init_plugins();
    this._googleInit();
  }

  ingresar( forma: NgForm ) {
    if( !forma.valid ){
      return;
    }

    let usuario = new Usuario(null, 
                              forma.value.email, 
                              forma.value.pass );

    this._serviceusuario.ingresarUsuario( usuario, forma.value.recuerdame )
    .subscribe(resp => this.router.navigate(['/dashboard']) );                                                   
  }

  _googleInit(){
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '268116512482-jektv3bs04l4sivnba8g9je0vi3t8a0f.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      let element = document.getElementById('googleS');

      this._attachSignIn( element );
    })
  }

  _attachSignIn( element ){
    this.auth2.attachClickHandler( element, {}, ( googleUser  => {
      
      let token = googleUser.getAuthResponse().id_token;
      
      
      this._serviceusuario.ingresarGoogle( token )
            .subscribe(resp => {
              this._location.go('/dashboard');
              location.reload();           
            });
    }))
  }

}
