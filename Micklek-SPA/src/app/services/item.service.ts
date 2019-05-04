import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Item } from '../models/item';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  urlBase = environment.apiUrl;
  items: Item[];

  constructor(private http: HttpClient) { }

  getItems() {
    return this.http.get<Item[]>(this.urlBase + 'Items');
  }

  getAllItems() {
    return this.http.get<Item[]>(this.urlBase + 'item', {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
        'Content-Type': 'application/json'
      })
    });
  }
}
