import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonToolbar, IonButton, IonItem, IonIcon, IonInput, IonFooter, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonSelect, IonSelectOption, IonContent, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, IonButton, IonItem, IonIcon, IonInput, IonFooter, TranslocoModule],
})
export class LoginPage implements OnInit {
  selectedLang: string = this.translocoService.getActiveLang();
  screen: any = 'signin';
  formData: FormGroup;
  isLoading: boolean = false;
  invalidCredentials: boolean = false;

  private readonly router = inject(Router);
  private readonly authenticationService = inject(AuthService);
  private readonly themeService = inject(ThemeService);

  constructor(private fb: FormBuilder, private translocoService: TranslocoService) {
    this.formData = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.authenticationService.isLoggedIn$().pipe(
      tap((isLoggedIn) => {
        if (isLoggedIn) {
          this.router.navigate(['/home']);
        }
      })
    ).subscribe();

    this.themeService.initialize();
  }

  change(event: any) {
    this.screen = event;
  }

  login() {
    var formData: any = new FormData();

    // remove the name field from the formData
    this.formData.removeControl('name');

    // validate email
    if (this.formData.get('email')?.value.length < 1) {
      this.formData.get('email')?.setErrors({ 'required': true });
      this.formData.get('email')?.markAsTouched();
      this.formData.get('email')?.markAsDirty();
      this.formData.get('email')?.updateValueAndValidity();
    }

    // validate password
    if (this.formData.get('password')?.value.length < 6) {
      this.formData.get('password')?.setErrors({ 'minlength': true });
      this.formData.get('password')?.markAsTouched();
      this.formData.get('password')?.markAsDirty();
      this.formData.get('password')?.updateValueAndValidity();
    }


    if (this.formData.valid) {
      this.isLoading = true
      const email = this.formData.get('email')?.value;
      const password = this.formData.get('password')?.value;

      formData.append('email', email ?? '');
      formData.append('password', password ?? '');

      this.authenticationService
        .login(email, password)
        .subscribe((data: any) => {
          console.log('login', data);
          this.isLoading = false;
          if (data) {
            this.router.navigate(['/home']);
          }
        }, (error: any) => {
          console.log('error', error);
          this.isLoading = false;
          this.invalidCredentials = true;
          setTimeout(() => {
            this.invalidCredentials = false;
          }
            , 3000);
        }
        );
    }

  }

  register() {
    var formData: any = new FormData();
    if (this.formData.valid) {
      this.isLoading = true
      formData.append('name', this.formData.get('name')?.value);
      formData.append('email', this.formData.get('email')?.value);
      formData.append('password', this.formData.get('password')?.value);
      console.log(this.formData)
      // this.auth.userRegister(formData).subscribe((data: any) => {
      //   console.log(data);
      // });
    }
  }

  changeLang(lang: string) {
    this.translocoService.setActiveLang(lang);
  }
}
