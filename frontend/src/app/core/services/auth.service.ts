import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {Role} from '../enums/role.enum';
import {environment} from '../../../environments/environment';
import {AuthResponseDto} from '../dtos/auth-response.dto';
import {LocalStorageService} from './local-storage.service';
import {jwtDecode, JwtPayload} from 'jwt-decode';

@Injectable({providedIn: 'root'})
export class AuthService {
  private httpClient: HttpClient = inject(HttpClient)
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private url = environment.apiUrl + '/auth';

  login(username: string, password: string): Observable<AuthResponseDto> {
    return this.httpClient.post<AuthResponseDto>(this.url+'/login', {username, password}).pipe(
      tap(res => {
        this.localStorageService.setItem<string>("token", res.token)
      }),
    )
  }

  getToken(): string | null {
    return this.localStorageService.getItem('token');
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

  getUser() {
    return `${this.getDecodedToken()!.sub} (${Role[this.getDecodedToken()!.role as keyof typeof Role]})`;
  }

  logout() {
    this.localStorageService.removeItem("token");
  }

  getRole() {
    return Role.ADMIN
  }
}
