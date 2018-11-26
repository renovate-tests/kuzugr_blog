import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from 'src/app/shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiEndpoint = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  current_user(): Observable<User> {
    return this.http.get<User>(`${this.apiEndpoint}/users` );
  }
}
