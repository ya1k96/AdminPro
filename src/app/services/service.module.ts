import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LoginGuard } from './guards/login.guard';
import {
  SettingsService,
  SidebarService,
  SharedService,
  UsuarioService
 } from './service.index';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    LoginGuard
  ],
  declarations: []
})
export class ServiceModule { }
