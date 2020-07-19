import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StreamsetService {

  constructor(private http:HttpClient) { }

  public getPipelines():Observable<any> {

    return this.http.get<any>('assets/Json/Pipelines.json');
  }

  public sendTopologyData(payload){
    // this.http.post<any>('assets/Json/Pipelines.json',payload);
  }

}
