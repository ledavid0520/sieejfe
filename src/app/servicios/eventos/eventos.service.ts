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
    return this.http.get(this.backendUrl + "listarInscritos/" + id, { withCredentials: true })
    .map((res: Response) => res.json());
  }

  obtenerEventos(){      
    return this.http.get(this.backendUrl + "listarTodosEventos/", { withCredentials: true })
    .map((res: Response) => res.json());
  }

}
