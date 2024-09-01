import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  httpClient = inject(HttpClient);
  url = 'https://66d22ce262816af9a4f60696.mockapi.io/api';

  constructor() { }

  list(){
    return this.httpClient.get(`${this.url}/vehicles`);
  }

  getById(id: number){
    return this.httpClient.get(`${this.url}/vehicles/${id}`);
  }

}
