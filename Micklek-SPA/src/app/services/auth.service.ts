import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  urlBase  = environment.apiUrl;
  token: any;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  login(model: any) {
    return this.http.post(this.urlBase + 'Auth/login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          sessionStorage.setItem('token', user.token);
          this.token = sessionStorage.getItem('token');
        }
      })
    );
  }

  loggedIn() {
    const token = sessionStorage.getItem('token');
    return (!this.jwtHelper.isTokenExpired(token));
  }
}
