import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { swal } from '../sweet/sweetFile';
declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  constructor( public _usuario: UsuarioService) { }
  public forma: FormGroup;
  ngOnInit() {    
    init_plugins();
    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required ),
      email: new FormControl(null,[Validators.required, Validators.email]),
      pass: new FormControl(null, Validators.required),
      pass2: new FormControl(null, Validators.required),
      condicion: new FormControl(null, Validators.required)
    },{validators: this._validarPass('pass','pass2')});
  }
  runReg(){
    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.email,
      this.forma.value.pass
    );

    this._usuario.crearUsuario( usuario )
    .subscribe( (respuesta:Usuario) => {      
      //Si la respuesta es valida limpiamos el formulario
      if( respuesta ){
        swal("Correcto!", respuesta.email, "success");
        //Formulario reseteado para ser repoblado
        this.forma.setValue({
              nombre: '',
              email: '',
              pass: '',
              pass2: '',
              condicion: ''
        });
        //Lo marcamos como no tocado, para hacer mas validaciones posteriormente
        this.forma.controls['nombre'].markAsUntouched();
        this.forma.controls['email'].markAsUntouched();
        this.forma.controls['pass'].markAsUntouched();
        this.forma.controls['pass2'].markAsUntouched();
        this.forma.controls['condicion'].markAsUntouched();
      }
    });
  }
  /*
  * Funcion de validacion para el campo contraseña
  */
  _validarPass(campo1:string, campo2: string){
    //Funcion de flecha
    return (group: FormGroup) => {
      let pass = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;
      
      if( pass === pass2 ){
        return null;  
      }else{
        return {
          matchPass: true
        }
      }
    }
  }
}
