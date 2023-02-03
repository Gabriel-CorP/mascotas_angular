import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Mascota } from 'src/app/interfaces/mascota';


const listMascotas: Mascota[] = [
 {nombre:'Gabriel', edad:24, raza:"golden", color:"dorado", peso:5},
 {nombre:'Isai', edad:24, raza:"dalmata", color:"dorado", peso:5},
 {nombre:'Corena', edad:24, raza:"doberman:v", color:"dorado", peso:5},
 {nombre:'Perez', edad:24, raza:"pastor aleman:v", color:"dorado", peso:5},
 {nombre:'Donald', edad:24, raza:"chihuahua", color:"dorado", peso:1}
];



@Component({
  selector: 'app-listado-mascota',
  templateUrl: './listado-mascota.component.html',
  styleUrls: ['./listado-mascota.component.css']
})
export class ListadoMascotaComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nombre', 'edad', 'raza', 'color', 'peso'];
  dataSource = new MatTableDataSource<Mascota>(listMascotas);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(){

  }
  ngOnInit():void{

  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator._intl.itemsPerPageLabel="Items por pagina";
  }
  
  
}
