import {Component, inject} from '@angular/core';
import {NzFormControlComponent, NzFormDirective, NzFormItemComponent} from 'ng-zorro-antd/form';
import {NzInputDirective, NzInputGroupComponent} from 'ng-zorro-antd/input';
import {NonNullableFormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {AuthService} from '../../../core/services/auth.service';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {LoadingService} from '../../../core/services/loading.service';
import {AsyncPipe} from '@angular/common';

@Component({
  templateUrl: 'login.html',
  imports: [
    NzFormDirective,
    NzFormItemComponent,
    NzFormControlComponent,
    NzInputGroupComponent,
    ReactiveFormsModule,
    NzButtonComponent,
    NzInputDirective,
    NzColDirective,
    NzRowDirective,
    AsyncPipe
  ],
  styleUrl: 'login.scss',
})
export class Login {
  private fb = inject(NonNullableFormBuilder);
  private router: Router = inject(Router);
  private message: NzMessageService = inject(NzMessageService);
  private authService: AuthService = inject(AuthService);
  protected loadingService: LoadingService = inject(LoadingService);

  validateForm = this.fb.group({
    username: this.fb.control('', [Validators.required]),
    password: this.fb.control('', [Validators.required]),
  });

  submitForm(): void {
    if (this.validateForm.valid) {
      const {username, password} = this.validateForm.value;
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
}
