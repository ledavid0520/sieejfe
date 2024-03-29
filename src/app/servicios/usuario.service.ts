import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class UsuarioService {

  constructor(
    private http: Http
  ) { }

  backendUrl = environment.url;

  obtenerEtiquetas(){      
    return this.http.get(this.backendUrl + "usuario/obtenerEtiquetas", { withCredentials: true })
    .map((res: Response) => res.json());
  }

  listarMisIdeas(){
    return this.http.get(this.backendUrl + "listarIdeasPorUsuario", { withCredentials: true })
    .map((res: Response) => res.json());
  }

  listarMisSolicitudes(){
    return this.http.get(this.backendUrl + "listarSolicitudesPorUsuario", { withCredentials: true })
    .map((res: Response) => res.json());
  }

}
