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
    console.log("%c---> POST url:" + url + "\n---> input:" + JSON.stringify(input),'background: #222; color: #bada55');
    return this.http.post(url, JSON.parse(input));
  }

  public get(url: string, queryString: string,httpParmas:any): Observable<any> {
    console.log("%c---> GET url:" + url + "\n---> queryString:" + JSON.stringify(queryString)+ "\n---> httpParmas:" + JSON.stringify(httpParmas),'background: #222; color: #bada55');
    if(queryString && queryString.length>0){
      url=url+(queryString.indexOf('?')>-1?queryString:'?'+queryString);
    }
    return this.http.get(url, { params: httpParmas});
  }

  public put(url: string, input: any): Observable<any> {
    console.log("%c---> PUT url:" + url + "\n---> input:" + JSON.stringify(input),'background: #222; color: #bada55');
    return this.http.put(url, JSON.parse(input));
  }

  public delete(url: string, queryString: string,httpParmas:any): Observable<any> {
    console.log("%c---> DELETE url:" + url + "\n---> queryString:" + JSON.stringify(queryString)+ "\n---> httpParmas:" + JSON.stringify(httpParmas),'background: #222; color: #bada55');
    if(queryString && queryString.length>0){
      url=url+(queryString.indexOf('?')>-1?queryString:'?'+queryString);
    }
    return this.http.delete(url, { params: httpParmas});
  }
}
