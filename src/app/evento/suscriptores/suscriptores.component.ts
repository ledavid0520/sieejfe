import { Component, OnInit, ViewChild, Input, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { EventosService } from '../../servicios/eventos/eventos.service';
import { DetallesCorreoComponent } from './detalles-correo/detalles-correo.component';
import { Output } from '@angular/core/src/metadata/directives';
import { concat } from 'rxjs/operator/concat';
import { PopupAvisoComponent } from '../../popup-aviso/popup-aviso.component';

@Component({
  selector: 'app-suscriptores',
  templateUrl: './suscriptores.component.html',
  styleUrls: ['./suscriptores.component.css']
})
export class SuscriptoresComponent implements OnInit {

  constructor(
    private eventosService : EventosService
  ) {
    this.dataSource = new MatTableDataSource(this.suscriptores);
   }

  ngOnInit(
  ) {
    this.esAdmin = JSON.parse(localStorage.getItem('ADMIN'));    
    this.atributosPersonalizados.push('');    
  }

  idUsuario:any;
  idEvento: any;
  esAdmin : boolean = false;

  cargarDetalles(idUsuario , idEvento){
    this.idUsuario=idUsuario;
    this.idEvento=idEvento;
    let data : any;
    console.log(idUsuario,idEvento);
    this.suscriptores=[];
    this.dataSource = new MatTableDataSource(this.suscriptores);
   
    this.eventosService.obtenerSuscritos(idEvento).subscribe(
      response => {         
        console.log(response);        
        response.forEach(element => {          
          data ={
            id: element.id,
            apellidos : element.apellidos,
            nombre : element.nombre,
            username : element.username,
            email : element.email
          };
          this.suscriptores.push(data);          
        });
        console.log(this.suscriptores);
        this.dataSource._updateChangeSubscription();
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort= this.sort;
        });
        
      }, error => {
        console.log("**obtenerSuscritos***"+error);
      }      
    ); 

    // if(idUsuario==90){
    
    //   data ={
    //     id : 1,
    //     nombre : 'David',
    //     estado : 'Aprobado'
    //   };
    //   this.suscriptores.push(data);

    // }else{
    //   data ={
    //     id : 2,
    //     nombre : 'Brayan',
    //     estado : 'En espera por seguridad'
    //   };
    //   this.suscriptores.push(data);
    //   data ={
    //     id : 3,
    //     nombre : 'Daniel',
    //     estado : 'Aprobado'
    //   }
    //   this.suscriptores.push(data);
    // }

    // this.dataSource._updateChangeSubscription();

  }
  
  displayedColumns = ['id', 'Nombre', 'Usuario', 'informacion'];
  dataSource: MatTableDataSource<any>;
  highlightedRows = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  suscriptores = new Array();
 
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  prueba(row : any){
    console.log("++++++++++++++++++++++++++++++++++");
    console.log(row)
  }

  exportarExcel(){
    this.eventosService.exportarExcel(this.idEvento).subscribe(
      response =>{
        console.log(response);
      });
  }

  exportarPDF(){
    this.eventosService.exportarPDF(this.idEvento).subscribe(
      response =>{
        console.log(response);
      });
  }
  atributosPersonalizados = new Array();
  
  abrirDetalles(row : any){    
    console.log(row, this.idEvento, row.id);   
    
    this.eventosService.getDetallesUsuario( this.idEvento, row.id).subscribe(
      response =>{        
        this.atributosPersonalizados=[];
        this.atributosPersonalizados=response;       
        console.log(this.atributosPersonalizados);
        this.llenarFormulario();
      }
    )
  }

  llenarFormulario(){
    if(this.atributosPersonalizados.length>0){
      let el : any;
      el = document.getElementById("overlayDetallesFinos");
      el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";

      

    }
  }

  cerrarPopUp(){
    console.log('cerrarPopUp : entro a cerrarPopUp');
      
    let el : any;
    el = document.getElementById("overlayDetallesFinos");
    el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
  }

  agregarSeleccion(row){
    let posicion= this.highlightedRows.indexOf(row);
    if(posicion == -1 ){
      this.highlightedRows.push(row);
    }else{
      this.highlightedRows.splice(posicion,1);
    }
    console.log(this.highlightedRows);
  }

  @ViewChild(DetallesCorreoComponent) detallesCorreo : DetallesCorreoComponent;  

  enviarCorreos(){
    console.log('enviarCorreos : entro a enviarCorreos');
    this.detallesCorreo.abrirPopUp();
   
  }

  mensajeMostrar : any = "Se han enviado los correos satisfactoriamente";
  onNotifyCorreos(e){
    
    let detallesCorreo ={
      usuario: this.highlightedRows,
      asunto:e.asunto,
      descripcion : e.descripcion
    }

    this.eventosService.enviarCorreos(detallesCorreo).subscribe(
      response =>{
        console.log(response);
        this.avisar();
      },
      error =>{
        console.log('Error en enviar varios correos')
      }
    )
  }

  @ViewChild(PopupAvisoComponent) avisoPopUp: PopupAvisoComponent;

  avisar(){
    PopupAvisoComponent.mostrarExito=true;
  }

  onCerrarNotify(e){
    console.log('Se cerro el pop up');
  }
  
}
