import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() { 
    
  }

  ngOnInit() {
   
    this.contarTres()
        .then( (mensaje) => {
          console.log('Perfect', mensaje);
        })
        .catch( (err) => {
          console.error('Error', err);
        });
  }
  
  contarTres(): Promise<boolean>{
    return new Promise( (resolve, reject) => {
      let contador = 0;
      let interval = setInterval(() => { 
        
        contador =+ 1;

        if(contador === 3){
          resolve(true);
          clearInterval( interval );
        }

       }, 1000);

    });
  }

}
