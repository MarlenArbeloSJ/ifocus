import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';

const baseUrl = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _user: User;
  private _token: string;

  constructor(private http: HttpClient) {}

  public get user(): User{
    if(this._user != null && this._user != undefined){
      return this._user;
    } else if((this._user == null || this._user == undefined) &&  sessionStorage.getItem('user') != null){
      this._user = JSON.parse(sessionStorage.getItem('user')!) as User;
      return this._user;
    }
    return new User();
  }

  public get token(): string{
    if(this._token != null && this._token != undefined){
      return this._token;
    } else if((this._token == null || this._token == undefined) &&  sessionStorage.getItem('token') != null){
      this._token = sessionStorage.getItem('token')!;
      return this._token;
    }
    return null!;
  }

  login(user: User): Observable<any> {
    console.log(`${baseUrl}/oauth/token`);
    const credentials = btoa('angular-app' + ':' + '12345');
    const httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/x-www-form-urlencoded',
      'Authorization' : 'Basic ' + credentials,
    });
    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', user.email);
    params.set('password', user.password);

    return this.http.post<any>(
      `${baseUrl}/security/oauth/token`,
      params.toString(),
      {
        headers: httpHeaders,
      }
    );
  }

  saveUser(accessToken: string): void {
    let payloadJWT = this.getJWTPayloadData(accessToken);
    this._user = new User();
    this._user.email = payloadJWT.user_name;
    this._user.name = payloadJWT.name;
    this._user.roles = payloadJWT.authorities;
    sessionStorage.setItem('user', JSON.stringify(this._user));
  }

  saveToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  getJWTPayloadData(accessToken: string): any {
    return accessToken != null
      ? JSON.parse(atob(accessToken.split('.')[1]))
      : null;
  }

}
