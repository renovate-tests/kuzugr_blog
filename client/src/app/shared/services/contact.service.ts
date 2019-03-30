import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '@environments/environment';
import { Contact } from '../models/contact';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  apiEndpoint = environment.apiEndpoint;

  constructor(private http: HttpClient) { }

  sendEmail(contact: Contact): any {
    return this.http.post<any>(`${this.apiEndpoint}/contacts/send_contact`, { contact: contact });
  }
}
