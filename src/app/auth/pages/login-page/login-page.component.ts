import { Component, NgZone } from '@angular/core';

import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { LoginForm } from 'src/app/interfaces/login-form.interface';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent {
  public wrongCredentials: boolean = false;
  public loginData: LoginForm;

  public user: User;

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
    private authService: AuthService,
    private location: Location
  ) {
    this.user = new User();
  }

  login(): void {
    console.log(this.user);
    if(this.user.email == null || this.user.password == null ){
      window.alert('El correo y la contraseña son campos obligatorios');
      return;
    }

    this.authService.login(this.user).subscribe(response => {
      console.log(response);
      this.authService.saveUser(response.access_token);
      this.authService.saveToken(response.access_token);
      let user = this.authService.user;
      Swal.fire({
        icon: 'success',
        title: 'Bienvenido ' + user.name
      })
      this.router.navigateByUrl('/home/dashboard');
    }, (error) => {
      if(error.status == 400){
        Swal.fire({
          icon: 'error',
          title: 'Credenciales incorrectas'
        })
      }
    });

  }

  goBack(): void {
    this.location.back();
  }
}
