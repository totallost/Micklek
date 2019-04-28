import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertifyService } from '../services/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private aletify: AlertifyService, private router: Router) {}
  canActivate(): boolean {
    if (this.auth.loggedIn()) {
      return true;
    }

    this.aletify.error('No Access');
    this.router.navigate(['/login']);
    return false;
  }
}
