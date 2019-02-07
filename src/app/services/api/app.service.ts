import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  url = environment.url;
  constructor(private http: HttpClient) { }

  geltAllProvider(){
    return this.http.get(`${this.url}/api/allProvider`).pipe(
      catchError(e => {
        throw new Error(e);
      })
    );
  }
}
