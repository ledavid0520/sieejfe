import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { DirectorioService } from '../servicios/directorio/directorio.service';
import * as jQuery from 'jquery';

@Component({
  selector: 'app-universidad',
  templateUrl: './universidad.component.html',
  styleUrls: ['./universidad.component.css']
})
export class UniversidadComponent implements OnInit {

  constructor(
    private directorioService : DirectorioService,
    private elementRef: ElementRef
  ) {
    this.dataSource = new MatTableDataSource(this.universidades);
   }

  @ViewChild('myModal') myModal:ElementRef;

  ngOnInit(
  ) {

    /*
    this.directorioService.obtenerDirectorio().subscribe(
      response => {
        console.log(response);
        response.forEach(element => {
          let data : any;
          data ={
            id : element.id,
            url : element.url,
            activo : element.activo,
            nombreUniversidad : element.nombreUniversidad,
            editaUniversidad : '---'
          };
          this.universidades.push(data);          
        });
        this.dataSource._updatePaginator(4);
        //this.dataSource._updateChangeSubscription();
        //this.dataSource.connect();

      },
      error => {
        console.log("no se puede obtener tipos identificacion tercero")
      }
    );  

    */

    let data : any;
    data ={
      id : 1,
      url : 'element.url',
      activo : true,
      nombreUniversidad : 'element.nombreUniversidad',
      editaUniversidad : '---'
    };
    this.universidades.push(data);
    data ={
      id : 2,
      url : 'url',
      activo : true,
      nombreUniversidad : 'element',
      editaUniversidad : '+++'
    };
    this.universidades.push(data);    
  }
  
  displayedColumns = ['id', 'URL', 'activo', 'nombre' , 'editar'];
  dataSource: MatTableDataSource<any>;
  universidadEditada : any;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  universidades = new Array();

  cerrarPopUp(){
    console.log('cerrarPopUp : entro a cerrarPopUp');
    let el : any;
    el = document.getElementById("overlay");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  abrirEditarU(row : any){
    console.log("++++++++++++++++++++++++++++++++++");
    this.universidadEditada=row.nombreUniversidad;
    console.log(this.universidadEditada.id);
    let el: any;
    el = document.getElementById("overlay");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
    //$(‘#overlay’).css(‘position’, ‘fixed’);
  }

}
