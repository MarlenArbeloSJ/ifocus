import { Component, NgZone } from '@angular/core';

import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginForm } from 'src/app/interfaces/login-form.interface';
import { UsuarioService } from 'src/app/services/usuario.service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent{

  public wrongCredentials : boolean = false;
  public loginData : LoginForm;

  public loginForm = this.fb.group({
    email: [ localStorage.getItem('email') || '' , [ Validators.required, Validators.email ] ],
    password: ['', Validators.required ],
    remember: [false]
  });

  constructor( private router: Router,
    private fb: FormBuilder,
    private ngZone: NgZone,
    private usuarioService : UsuarioService) { }

  login(){

    console.log("Login");
    console.log(this.loginForm.value );


  this.usuarioService.loginUser( this.loginForm.value )
    .subscribe( resp => {

      if ( this.loginForm.get('remember')?.value ){
        localStorage.setItem('email', this.loginForm.get('email').value );
      } else {
        localStorage.removeItem('email');
      }

      // Navegar al Dashboard
      this.router.navigateByUrl('/');

    }, (error) => {
      // Si sucede un error
    });
  }

}


