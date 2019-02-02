import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Item } from '../models/item';
import { HttpClient } from '@angular/common/http';

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
}
