import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class MapStateInfoService {

  constructor(
    private http: HttpClient
  ) { }

  private url: string = 'https://marsruty.ru/krasnodar/gps.txt' + '?' + new Date().getTime();

  getMapInfo(): Observable<any> {
    return this.http.get(`${this.url}`, { responseType: 'text' })
    .pipe(
      map(data => data.split('\n'))
    )
  }
}
