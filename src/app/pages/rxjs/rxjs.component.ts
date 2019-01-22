import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { retry, map, filter } from 'rxjs/operators';
import { Subscriber } from 'rxjs/Subscriber';
import { Subscription } from 'rxjs/Subscription';
@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit {
subs: Subscription;
  constructor() { 
  
    this.subs = this.obs().pipe(
      retry(1)
    )
    .subscribe( ( response ) => {
      console.log( 'subs', response );
    },
    ( error ) => {
      console.log('Error me desmayo', error);
    },
    ( ) => { 
      console.log('Terminado!');
    });
  }

  ngOnInit() {
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  obs(): Observable<any>{
    return new Observable( (observer: Subscriber<any>) => {
      let contador = 0;
      let interval = setInterval(() =>{
        contador++;               
        observer.next({contador}); 

        if( contador === 3){          
          clearInterval( interval );
          observer.complete();
        }
        // if( contador === 2){
        //   observer.error('Auxilio me desmayo');
        // }
      },1000);

    })
    .pipe( map( res =>  res.contador),
           filter( ( resp, index ) => { 
            if( resp % 2 !== 0 ){
              console.log('impar', resp);
            }
            return true; 
            }) 
        );
    // .pipe(map( (res) =>  res.contador ));
  }
}
