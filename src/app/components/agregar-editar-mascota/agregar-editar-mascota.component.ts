import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatSnackBar, MatSnackBarRef} from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Mascota } from 'src/app/interfaces/mascota';
import { MascotaService } from 'src/app/services/mascota.service';
@Component({
  selector: 'app-agregar-editar-mascota',
  templateUrl: './agregar-editar-mascota.component.html',
  styleUrls: ['./agregar-editar-mascota.component.css']
})
export class AgregarEditarMascotaComponent {

    loading:boolean=false;
    formulario:FormGroup;
    id:number;
    operacion:string= 'Agregar';
  constructor(private _snackBar: MatSnackBar, 
    private fb:FormBuilder,
     private _mascotaService:MascotaService,
     private router: Router, 
     private aRoute: ActivatedRoute){

      //definicion de validaciones
    this.formulario=this.fb.group({
      nombre:['',Validators.required],
      raza:['',Validators.required],
      color:['',Validators.required],
      edad:['',Validators.required],
      peso:['',Validators.required],
    });
//obteniendo el id para saber si esta editando o agregando
this.id= Number(aRoute.snapshot.paramMap.get('id'));
//si id = 0 sera agregar sino editar

  }
  ngOnInit():void{
    if(this.id!=0){
      this.operacion="Editar";
      this.obtenerMascota(this.id);
    }
  }

  obtenerMascota(id:number){
    this.loading=true;
    this._mascotaService.getMascota(id).subscribe(
      info=>{
        this.loading=false;
        console.log(info);
        this.formulario.setValue({
          nombre:info.nombre,
          raza: info.raza,
          edad: info.edad,
          peso: info.peso,
          color: info.color
        });
      }
    )
  }



  agregarEditarMascota(){
    this.loading=true;
//armammos el objeto
    const mascota:Mascota={
      nombre:this.formulario.value.nombre,
      raza:this.formulario.value.raza,
      edad:this.formulario.value.edad,
      color:this.formulario.value.color,
      peso:this.formulario.value.peso
    }
    if(this.id!=0){
      mascota.id=this.id;
      this.editarMascota(this.id,mascota);
    }
    this.agregarMascota(mascota);
     
  }
  agregarMascota(mascota:Mascota){
    //enviamos al back 
this._mascotaService.addMascota(mascota).subscribe(
  data=>{
    console.log(data); 
    this.mensajeExito();
    this.loading=false; 
    this.router.navigate(['/listadoMascota']);//redireccionando a otra vista
  }, err=>{
    console.log(err);
  });
}
  editarMascota(id:number, mascota:Mascota){
    this._mascotaService.updateMascota(id,mascota).subscribe(
      data=>{
        console.log(data); 
        this.mensajeExito();
        this.loading=false; 
        this.router.navigate(['/listadoMascota']);//redireccionando a otra vista
      }, err=>{
        console.log(err);
      }
      );
    

  }

  mensajeExito(){
    this._snackBar.open('La mascota fue guardada con exito', '' ,{
      duration:1000,
      horizontalPosition:'center',
      verticalPosition:'top'
     }  );
  }


}
