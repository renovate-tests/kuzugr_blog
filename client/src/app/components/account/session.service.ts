import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from 'src/app/shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  apiEndpoint = 'http://localhost:3000/api/v1';
  public loginFlag = new EventEmitter();

  constructor(private http: HttpClient) { }

  login(user: User): Observable<User> {
    this.loginFlag.emit(false);
    const response = this.http.post<User>(`${this.apiEndpoint}/login`, { user: user } );
    if ( response['status'] !== undefined ) {
      console.log('aaa');
      this.loginFlag.emit(true);
    }
    return response;
  }
}
