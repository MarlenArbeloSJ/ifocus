import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css'],
})
export class LayoutPageComponent {
  public user : User;
  public role : string;
  public collapseSideBar : boolean;

  constructor( private authService: AuthService) {
    this.collapseSideBar = false;
    this.user = this.authService.user;
    this.role = this.user != null && this.user.roles.length > 0 ? this.user.roles[0].split("_")[1] : '';
  }

}
