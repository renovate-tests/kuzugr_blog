import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UploadFileService {
  apiEndpoint = environment.apiEndpoint;

  constructor(private http: HttpClient) {}

  uploadFile(params: any): any {
    return this.http.post(`${this.apiEndpoint}/upload_files`, params);
  }
}
