import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {Role} from '../enums/role.enum';
import {environment} from '../../../environments/environment';
import {AuthResponseDto} from '../dtos/auth-response.dto';
import {LocalStorageService} from './local-storage.service';
import {jwtDecode, JwtPayload} from 'jwt-decode';
import {Router} from '@angular/router';
import {LOGIN_PAGE} from '../constants/nav-link.const';

@Injectable({providedIn: 'root'})
export class AuthService {
  private TOKEN_STORAGE_KEY = "token";
  private url = environment.apiUrl + '/auth';
  private httpClient: HttpClient = inject(HttpClient)
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private router: Router = inject(Router);

  login(username: string, password: string): Observable<AuthResponseDto> {
    return this.httpClient.post<AuthResponseDto>(this.url+'/login', {username, password}).pipe(
      tap(res => {
        this.localStorageService.setItem<string>(this.TOKEN_STORAGE_KEY, res.token)
      }),
    )
  }

  getToken(): string | null {
    return this.localStorageService.getItem(this.TOKEN_STORAGE_KEY);
  }

  getDecodedToken(): JwtPayload & {role: string} | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      return jwtDecode<JwtPayload & {role: string}>(token);
    } catch (error) {
      console.error('Hibás token', error);
      return null;
    }
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getUsername() {
    return this.getDecodedToken()!.sub;
  }

  getUser() {
    return `${this.getUsername()} (${Role[this.getRole()]})`;
  }

  getRole() {
    return this.getDecodedToken()!.role as keyof typeof Role;
  }

  logout() {
    this.localStorageService.removeItem(this.TOKEN_STORAGE_KEY);
    this.router.navigate([LOGIN_PAGE]);
  }
}
