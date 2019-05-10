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

  deleteItemPhoto(id: string) {
    return this.http.delete(this.urlBase + 'photos/' + id, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
        'Content-Type': 'application/json'
      })
    });
  }

  uploadPhoto(formData) {
    return this.http.post(this.urlBase + 'photos/add', formData, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
        // 'Content-Type': 'multipart/form-data',
        'Accept': 'application/json'
      })
    });
  }

  updateItemDetails(id: string, item: Item) {
    return this.http.put<Item>(this.urlBase + 'item/' + id, item, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
        'Content-Type': 'application/json'
      })
    });
  }

  addNewItem(item: Item) {
    return this.http.post<Item>(this.urlBase + 'item/add', item, {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
        'Content-Type': 'application/json'
      })
    });
  }
}
