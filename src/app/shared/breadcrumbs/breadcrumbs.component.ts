import { Component, OnInit } from '@angular/core';
import { Router, RouterStateSnapshot, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, MetaDefinition, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {
titulo: string;
  constructor( private _router: Router,
               private title: Title,
               private meta: Meta ) { 
    this.getDataRoute().subscribe( res => this.titulo = res.titulo );
    //Set title page
    this.title.setTitle( this.titulo );
    //Nuevo tag
    let metaTags: MetaDefinition = {
      description: this.titulo
    };

    this.meta.updateTag( metaTags );
  }

  ngOnInit() {
  }

  getDataRoute(){
   return this._router.events.pipe(      
      filter( (res) => res instanceof ActivationEnd ),
      filter( (res:ActivationEnd) => res.snapshot.firstChild === null ),
      map( res => res.snapshot.data )           
    );
  }
}
