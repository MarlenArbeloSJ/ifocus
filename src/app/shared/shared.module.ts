import { NgModule } from '@angular/core';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { NavbarComponent } from './navbar/navbar.component';



@NgModule({
  declarations: [
    Error404PageComponent,
    NavbarComponent
  ],
  exports: [
    Error404PageComponent,
    NavbarComponent
  ]
})
export class SharedModule { }
