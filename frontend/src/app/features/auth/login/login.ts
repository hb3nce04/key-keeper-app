import {Component, inject} from '@angular/core';
import {FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {LoadingService} from '../../../core/services/loading.service';
import {Form} from '../../../shared/components/form/form';
import {FieldConfig} from '../../../shared/components/form/form.type';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {AsyncPipe} from '@angular/common';

@Component({
  template: `
    <div class="login-container">
      <h2>Kérem jelentkezzen be!</h2>
      <app-form [fields]="fields" (validSubmit)="handleLogin($event)" class="login-form">
        <button submit-button nz-button class="login-form-button login-form-margin" [nzType]="'primary'"
                [disabled]="this.loadingService.$loading | async">Bejelentkezés
        </button>
      </app-form>
    </div>
  `,
  imports: [
    ReactiveFormsModule,
    Form,
    NzButtonComponent,
    AsyncPipe
  ],
  styleUrl: 'login.scss',
})
export class Login {
  private router: Router = inject(Router);
  private message: NzMessageService = inject(NzMessageService);
  private authService: AuthService = inject(AuthService);
  protected loadingService: LoadingService = inject(LoadingService);

  fields: FieldConfig[] = [
    {
      name: 'username',
      placeholder: 'Felhasználónév',
      type: 'text',
      icon: 'user',
      validators: [Validators.required],
    },
    {
      name: 'password',
      placeholder: 'Jelszó',
      type: 'password',
      icon: 'lock',
      validators: [Validators.required],
    }
  ]

  handleLogin(form: FormGroup): void {
    const {username, password} = form.value;
    this.authService.login(username!, password!).subscribe({
      next: () => {
        this.router.navigate(['/dashboard/borrowings']);
        this.message.success("Sikeres bejelentkezés!")
      },
      error: (error) => {
        if (error.status === 403) {
          this.message.error("Hibás felhasználónév vagy jelszó!");
        }
      }
    })
  }
}
