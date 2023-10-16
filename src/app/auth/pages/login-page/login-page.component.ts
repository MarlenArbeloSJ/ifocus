import { Component, NgZone } from '@angular/core';

import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginForm } from 'src/app/interfaces/login-form.interface';
import { User } from 'src/app/models/user.model';
import { UsuarioService } from 'src/app/services/usuario.service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  public wrongCredentials: boolean = false;
  public loginData: LoginForm;

  public loginForm = this.fb.group({
    email: [
      localStorage.getItem('email') || '',
      [Validators.required, Validators.email],
    ],
    password: ['', Validators.required],
    remember: [false],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private ngZone: NgZone,
    private usuarioService: UsuarioService
  ) {}

  login() {
    const loginFormData: LoginForm = {
      email: this.loginForm.value.email ?? '',
      password: this.loginForm.value.password ?? '',
      remember: this.loginForm.get('remember')?.value ?? false,
    };

    console.log('Login');
    console.log(loginFormData);

    this.usuarioService.loginUser(loginFormData).subscribe(
      (resp) => {
        if (loginFormData.remember) {
          localStorage.setItem('email', loginFormData.email);
        } else {
          localStorage.removeItem('email');
        }

        // Navegar al Dashboard
        console.log('Logeado correctamente');
        window.alert('Bienvenido Javier');
        //this.router.navigateByUrl('/');
      },
      (error) => {
        // Si sucede un error
        console.log(error);
      }
    );
  }
}
