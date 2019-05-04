import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ItemsManagementService {

  constructor(private http: HttpClient) { }

  getAllItems() {
    
  }

}
