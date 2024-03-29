import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class EventosService {

  constructor(
    private http: Http
  ) { }

  backendUrl = environment.url;

  obtenerSuscritos(id : any){      
    console.log(id);
    return this.http.get(this.backendUrl + "listarInscritos/" + id, { withCredentials: true })
    .map((res: Response) => res.json());
  }

  obtenerEventos(){      
    return this.http.get(this.backendUrl + "listarTodosEventos/", { withCredentials: true })
    .map((res: Response) => res.json());
  }

  crearEvento(evento : any){      
    return this.http.post(this.backendUrl + "crearEvento/", evento, { withCredentials: true })
    .map((res: Response) => res.json());
  }

  enviarCorreos(detallesCorreo){     
    console.log(detallesCorreo); 
    return this.http.post(this.backendUrl + "notificarUsuarios/", detallesCorreo, { withCredentials: true })
    .map((res: Response) => res.json());
  }

  suscribirse(id:any){
    console.log(id);
    return this.http.get(this.backendUrl + "inscribirse/"+id , { withCredentials: true })
    .map((res: Response) => res.json());
  }

  estaInscrito(id : any){
    console.log(id);
    return this.http.get(this.backendUrl + "inscrito/"+id , { withCredentials: true })
    .map((res: Response) => res.json());
  }

  listarMisEventos(){
    return this.http.get(this.backendUrl + "listarEventosPorUsuario/" , { withCredentials: true })
    .map((res: Response) => res.json());
  }

  guardarDatosPersonalizados(atributosPersonalizados){
    return this.http.post(this.backendUrl + "guardarDatosPersonalizados/", atributosPersonalizados, { withCredentials: true })
    .map((res: Response) => res.json());
  }

  exportarExcel(id : any){
    console.log('exportarExcel : entro a exportarExcel')
    return this.http.get(this.backendUrl + "exportarExcelInscritos/"+ id , { withCredentials: true })
    .map((res: Response) => res.json());
  }

  exportarPDF(id : any){
    return this.http.get(this.backendUrl + "exportarPdfInscritos/"+ id , { withCredentials: true })
    .map((res: Response) => res.json());
  }

  getDetallesUsuario(evento, usuario){
    console.log('getDetallesUsuario : entro a getDetallesUsuario')
    return this.http.get(this.backendUrl + "listarDatosPersonalizadosPorUsuario/" +evento + "/"+ usuario , { withCredentials: true })
    .map((res: Response) => res.json());
  }

}
