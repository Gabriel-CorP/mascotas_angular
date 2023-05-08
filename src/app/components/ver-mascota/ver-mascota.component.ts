import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Mascota } from 'src/app/interfaces/mascota';
import { MascotaService } from 'src/app/services/mascota.service';

@Component({
  selector: 'app-ver-mascota',
  templateUrl: './ver-mascota.component.html',
  styleUrls: ['./ver-mascota.component.css']
})
export class VerMascotaComponent {
    id: number;
    mascota!:Mascota;
    mascota$!:Observable<Mascota>;
    loading: boolean=false;


constructor(private _mascotaService:MascotaService, private aRouter: ActivatedRoute ){
  this.id=Number(this.aRouter.snapshot.paramMap.get('id'));
  console.log(this.id);
}
ngOnInit():void{
  this.loading=true;
  this.mascota$=this._mascotaService.getMascota(this.id);
  this.loading=false;
  /* con subscripciones lo comwntado this.obtenerMascota();
    
  
  */
  }
  /*
obtenerMascota(){
  this._mascotaService.getMascota(this.id).subscribe(informacion=>{
    this.mascota=informacion;
  })
}
*/

}
