import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-datos',
  templateUrl: './datos.component.html',
  styleUrls: ['./datos.component.scss']
}) 
export class DatosComponent implements OnInit {
forma: FormGroup;
clientes: string[] = ['Claro', 'Entel', 'BCP', 'BBVA', 'Interbank'];

  constructor() {
    this.forma = new FormGroup({
      nombreCompleto: new FormGroup({
        nombre: new FormControl('', [Validators.required, Validators.minLength(4), this.notAndrea]),
      apellido: new FormControl('', [Validators.required, Validators.minLength(10)])
      }),
      usuario: new FormControl('', [Validators.required], this.existeUsuario),
      cargo: new FormControl('', [Validators.required], this.existeCargo),
      pass: new FormControl('', [Validators.required]),
      pass2: new FormControl('', Validators.required),
      cliente: new FormControl('', Validators.required),
      correo: new FormControl('', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      vacaciones: new FormControl(false, Validators.required),
      intereses: new FormArray([
        new FormControl('', Validators.required)
      ])
    });
    this.forma.controls.pass2.setValidators([
   Validators.required,
   this.noIgual.bind(this.forma)
]); 

  }
  ngOnInit(): void {
  }

  guardar(){
    console.log(this.forma);
  }
agregarintereses(){
  const intereses = this.forma.controls.intereses as FormArray;
 // if (index <=2){
  intereses.push(new FormControl('', Validators.required));
 // } else{
 // intereses.push(new FormControl());
 // }
}
notAndrea(control: FormControl): {[s: string]: boolean}{
  if (control.value === 'Andrea'){
    return { notAndrea: true };
  }
}

noIgual(control: FormControl): {[s: string]: boolean}{
  const forma: any = this;
  if (control.value !== forma.control.pass.value){
    return { noIgual: true };
  }
}

existeUsuario(control: FormControl): Promise<any> | Observable<any> {
  const promesa = new Promise(
    (resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'culqui') {
          resolve({existe: true});
        } else {
          resolve(null);
        }
      }, 3000);
    }
  );
  return promesa;
}

existeCargo(control: FormControl): Promise<any> | Observable<any>{
  const promesa = new Promise(
   (resolve, reject) => {
     setTimeout(() => {
      if (control.value === 'Administrador'){
        resolve({existe: true});
      } else{
        resolve(null);
      }
    }, 3000);
   }
  );
  return promesa;
}
}

