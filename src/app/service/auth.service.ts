import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {User} from "./user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';

  public username: string = null;
  public password: string = null;
  public authUser: User = null;

  constructor(private http: HttpClient) {

  }



  authenticationService(username: string, password: string): Observable<any> {
    return this.http.get<User>(`http://localhost:8080/api/v1/basicauth`,
      { headers: { authorization: this.createBasicAuthToken(username, password) } }).pipe(map((authUser) => {
      this.username = username;
      this.password = password;
      this.authUser = authUser;
      this.registerSuccessfulLogin(username, password);
    }));
  }

  createBasicAuthToken(username: string, password: string): string {
    return 'Basic ' + window.btoa(username + ':' + password);
  }

  registerSuccessfulLogin(username, password): void {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username);
  }

  logout(): void {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    this.username = null;
    this.password = null;
  }

  isUserLoggedIn(): boolean {
    const user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    return user !== null;
  }

  getLoggedInUserName(): string {
    const user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    return user === null ? '' : user;
  }
}
