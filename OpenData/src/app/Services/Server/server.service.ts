import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';

import { ServerModel } from 'src/app/Models/ServerModel';
import { ServerMessageModel } from 'src/app/Models/ServerMessageModel';

import { IServer } from 'src/app/Interfaces/IServer';

@Injectable({
  providedIn: 'root'
})

export class ServerService implements IServer{

  constructor(private _http: HttpClient) { 
  }

  getServers(): Observable<ServerModel[]>{
    return this._http.get<ServerModel[]>('https://localhost:44319/api/server/')
    .pipe(map(res => res || []),catchError((err) => {throw 'Error in source. Details: ' + err; }));
  }

  updateServer(payload: ServerMessageModel):Observable<any>{
    const httpOptions:Object = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Accept': 'q=0.8;application/json;q=0.9'
      })
    };
    const URL:string = 'https://localhost:44319/api/server/' + payload.id;

    return this._http.put(URL,payload,httpOptions) 
    .pipe(catchError(err=> {throw 'Something went wrong. Details: ' + err}));
  }
}

