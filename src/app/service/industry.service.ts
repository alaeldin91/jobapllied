import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IndustryService {

  baseUrl ;
  constructor(private httpClient:HttpClient) { 
    this.baseUrl = "http://localhost:8000/api/experience"
  }

  getIndustryService(token:string){
 
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });

    const industryUrl = `${this.baseUrl}/getindustry`;

    return this.httpClient.get(industryUrl,{headers});

  }
}
