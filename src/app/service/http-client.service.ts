import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(
    private readonly http: HttpClient,
  ) {}


  public post(url: string, input: any): Observable<any> {
    return this.http.post(url, JSON.parse(input));
  }

  public get(url: string, queryString: string,httpParmas:any): Observable<any> {
    if(queryString && queryString.length>0){
      url=url+(queryString.indexOf('?')>-1?queryString:'?'+queryString);
    }
    return this.http.get(url, { params: httpParmas});
  }

  public put(url: string, input: any): Observable<any> {
    return this.http.put(url, JSON.parse(input));
  }

  public delete(url: string, queryString: string,httpParmas:any): Observable<any> {
    if(queryString && queryString.length>0){
      url=url+(queryString.indexOf('?')>-1?queryString:'?'+queryString);
    }
    return this.http.delete(url, { params: httpParmas});
  }
}
