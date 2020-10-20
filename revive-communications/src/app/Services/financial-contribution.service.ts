import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FinancialContributionService {

  constructor(private http: HttpClient) { }

  getChurchNames(): Observable<any>
  {
    return this.http.get('https://localhost:44390/api/FinancialContribution/getAllChurches')
  }

  getChurchBanking(churchSelection: number)
  {
    return this.http.get('https://localhost:44390/api/FinancialContribution/getChurchByID?ChurchBankID=' + churchSelection).pipe(map(result => result))
    
  }
}

