import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  public user : User;
  public role : string;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
    this.user = this.authService.user;
    this.role = this.user != null && this.user.roles.length > 0 ? this.user.roles[0].split("_")[1] : '';
  }
}
