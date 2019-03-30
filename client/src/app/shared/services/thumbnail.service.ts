import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ThumbnailService {
  apiEndpoint = environment.apiEndpoint;

  constructor(private http: HttpClient) { }

  uploadThumbnail(params: any): any {
    return this.http.post(`${this.apiEndpoint}/thumbnails/create`, params );
  }
}
