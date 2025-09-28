import {computed, inject, Injectable, signal, WritableSignal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {environment} from '../../../environments/environment';
import {AuthResponseDto} from '../dtos/auth-response.dto';
import {LocalStorageService} from './local-storage.service';
import {jwtDecode, JwtPayload} from 'jwt-decode';
import {Router} from '@angular/router';
import {LOGIN_PAGE} from '../constants/links.const';

@Injectable({providedIn: 'root'})
export class AuthService {
  private TOKEN_STORAGE_KEY = "token";
  private url = environment.apiUrl + '/auth';
  private httpClient: HttpClient = inject(HttpClient)
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private router: Router = inject(Router);

  readonly token: WritableSignal<string | null> = signal(this.localStorageService.getItem(this.TOKEN_STORAGE_KEY))

  readonly isLoggedIn = computed(() => !!this.token())
  readonly isAdmin = computed(() => this.getDecodedToken()?.role === "ROLE_ADMIN");
  readonly getUsername = computed(() => this.getDecodedToken()?.username)

  login(username: string, password: string): Observable<AuthResponseDto> {
    return this.httpClient.post<AuthResponseDto>(this.url + '/login', {username, password}).pipe(
      tap(res => {
        this.localStorageService.setItem<string>(this.TOKEN_STORAGE_KEY, res.token)
        this.token.set(res.token)
      }),
    )
  }

  getDecodedToken(): JwtPayload & { username: string, role: string } | null {
    const token = this.token();
    if (!token) return null;
    try {
      return jwtDecode<JwtPayload & { username: string, role: string }>(token);
    } catch (error) {
      console.error('Hibás token', error);
      return null;
    }
  }

  logout() {
    this.localStorageService.removeItem(this.TOKEN_STORAGE_KEY);
    this.token.set(null);
    this.router.navigate([LOGIN_PAGE]);
  }
}
