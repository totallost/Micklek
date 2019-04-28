import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  values: {
    id: Number,
    name: string
  };

  constructor(private http: HttpClient) { }

  ngOnInit() {
    const token = sessionStorage.getItem('token');
    this.http.get('https://localhost:5001/api/values', {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + token,
        'Content-Type': 'application/json'
      })
    }).subscribe((response: {id: Number, name: string}) => {
      this.values = response;
    }, err => {
      console.log(err);
    });
  }

}
