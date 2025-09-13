import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Role} from '../enums/role.enum';

@Injectable({providedIn: 'root'})
export class AuthService {
  private httpClient: HttpClient = inject(HttpClient)
  loggedIn = false;

  login(username: string, password: string): Observable<boolean> {
    if (username === 'admin' && password === 'admin') {
      this.loggedIn = true;
      return of(true);
    }
    return of(false);
  }

  getUser() {
    return "admin (admin)";
  }

  logout() {
    this.loggedIn = false;
  }

  getRole() {
    return Role.ADMIN
  }
}
