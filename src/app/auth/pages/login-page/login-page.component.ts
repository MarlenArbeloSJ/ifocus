import { Component, NgZone } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent{

  public wrongCredentials : boolean = false;
  public loginForm = this.fb.group({
    email: [ localStorage.getItem('email') || '' , [ Validators.required, Validators.email ] ],
    password: ['', Validators.required ],
    remember: [false]
  });

  constructor( private router: Router,
    private fb: FormBuilder,
    private ngZone: NgZone ) { }

  login(){
    console.log("Login");
  }

}


