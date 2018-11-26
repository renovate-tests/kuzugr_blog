import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from 'src/app/shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiEndpoint = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  currentUser(): Observable<User> {
    const response = this.http.get<User>(`${this.apiEndpoint}/users`);
    console.log('aaa');
    console.log('response');
    return response['user']
  }
}
