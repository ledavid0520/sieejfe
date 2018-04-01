import { Component, OnInit, ViewChild } from '@angular/core';
import { DirectorioService } from '../../servicios/directorio/directorio.service';
import { DominioPopUpComponent } from '../dominio-pop-up/dominio-pop-up.component';
import { AdicionarDominioPopUpComponent } from '../adicionar-dominio-pop-up/adicionar-dominio-pop-up.component';
import { ImagenPopUpComponent } from '../imagen-pop-up/imagen-pop-up.component';

@Component({
  selector: 'app-relacionamiento-externo',
  templateUrl: './relacionamiento-externo.component.html',
  styleUrls: ['./relacionamiento-externo.component.css']
})
export class RelacionamientoExternoComponent implements OnInit {

  @ViewChild(DominioPopUpComponent) 
  dominioPopUp: DominioPopUpComponent;

  @ViewChild(AdicionarDominioPopUpComponent) 
  adicionarPopUp: AdicionarDominioPopUpComponent;

  @ViewChild(ImagenPopUpComponent) 
  imagenDominio: ImagenPopUpComponent;

  constructor(
    private directorioService : DirectorioService
  ) { }

  datos : any;
  esAdmin : boolean = false;
  // valorEtiquetas = new  Array ();

  ngOnInit() {
    this.esAdmin = JSON.parse(localStorage.getItem('ADMIN'));

    let datos;
    datos={ id: 2 , nombre: 'Universidad Distrital', url: "http://www.javeriana.edu.co" , imagen: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Escudo150.gif" };

    this.datos=datos;
    // this.valorEtiquetas.push(datos);

    // datos={ id: 1 , nombre: 'Universidad Javeriana Bogota', url: "http://www.javeriana.edu.co" , imagen: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Escudo150.gif" };
    // this.valorEtiquetas.push(datos);

    // datos={ id: 4 , nombre: 'Universidad Nacional Bogota', url: "http://www.javeriana.edu.co" , imagen: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Escudo150.gif" };
    // this.valorEtiquetas.push(datos);

    // datos={ id: 1 , nombre: 'Universidad Javeriana Bogota', url: "http://www.javeriana.edu.co" , imagen: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Escudo150.gif" };
    // this.valorEtiquetas.push(datos);

    // datos={ id: 4 , nombre: 'Universidad Nacional Bogota', url: "http://www.javeriana.edu.co" , imagen: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Escudo150.gif" };
    // this.valorEtiquetas.push(datos);

    // datos={ id: 1 , nombre: 'Universidad Javeriana Bogota', url: "http://www.javeriana.edu.co" , imagen: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Escudo150.gif" };
    // this.valorEtiquetas.push(datos);

    // datos={ id: 4 , nombre: 'Universidad Nacional Bogota', url: "http://www.javeriana.edu.co" , imagen: "https://upload.wikimedia.org/wikipedia/commons/e/e1/Escudo150.gif" };
    // this.valorEtiquetas.push(datos);
  }

  dominiosInternacionales = new  Array ();
  
  abrirLink(u : any){
    window.open(u,'_blank'); 
  }

  getDominiosInternacionales(tipo : any){
    console.log('getDominiosInternacionales : entro a getDominiosInternacionales', tipo)
    this.dominiosInternacionales=[];
    
    this.directorioService.listarDominiosInternacionales(tipo).subscribe(
      response => {
        this.dominiosInternacionales = response;
        console.log(this.dominiosInternacionales);
      },
      error => {
        console.log("Error en dominios internacionales")
      }
    );
  }

  seleccion(seleccion){
    console.log('seleccion : entro a seleccion', seleccion)
  }

  editarDominioInternacional(dominio : any){
    console.log('editarDominioInternacional : entro a editarDominioInternacional');
    
    this.dominioPopUp.mostrarEdicionDominio=true;
    this.dominioPopUp.abrirEditarDominio(dominio);
  }

  editarImagenDominioInternacional(idAsociado : any){
    console.log('editarImagenDominioNacional : entro a editarImagenDominioNacional');
    //Para que cargue imagen defecto
    this.imagenDominio.cargo=false;
    this.imagenDominio.mostrarImagenDominio=true;
    this.imagenDominio.abrirImagenDominio(idAsociado);
  }

  abrirEdicion(){
    console.log('abrirEdicion : entro a abrirEdicion');
        
    this.adicionarPopUp.mostrarAdicionDominio=true;
    this.adicionarPopUp.abrirAdicionarDominio('INTERNACIONAL');
  }

}
