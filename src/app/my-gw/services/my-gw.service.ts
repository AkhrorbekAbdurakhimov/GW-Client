import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MyGwService {

  constructor(private http: HttpClient) { }

  getThemesById(id: number, role: string) {
    return this.http
      .get<any>(`${environment.apiUrl}/themes/list?${role}Id=${id}`);
  }
}
