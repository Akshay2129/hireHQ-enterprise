import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = environment.AUTH_URL;
  }

  get(){
   return this.http.get(`${this.baseUrl}`);
  }
}
