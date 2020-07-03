import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ApiCommService {

  private baseURL='http://localhost:8000/'

  constructor(private httpClient: HttpClient) { }

    getStocks(): Observable<string[] | any> {
      return this.httpClient.get(this.baseURL + 'stocks');
    }

    getIndicators(): Observable<string[] | any> {
      return this.httpClient.get(this.baseURL + 'indicators/AAPL/1');
    }

    getModels(symbol: string): Observable<string[] | any> {
      return this.httpClient.get(this.baseURL + 'models/' + symbol);
    }

    addStock(symbol: string): Observable<string[] | any> {
      return this.httpClient.get(this.baseURL + 'update/' + symbol);
    }

    getStockData(symbol:string, window:string): Observable<string[] | any> {
      return this.httpClient.get(this.baseURL + symbol + '/' + window);
    }

    trainNewModel(symbol:string): Observable<string[] | any> {
      return this.httpClient.get(this.baseURL + 'train/' + symbol );
    }

    getHyperParams(): Observable<string[] | any> {
      return this.httpClient.get(this.baseURL + 'model/params' );
    }

    patchModelParams(userObj):any{
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };
      return this.httpClient.put(this.baseURL + 'model/params', userObj);
    }

}

