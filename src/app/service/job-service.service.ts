import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JobListResponse } from '../common/jobs';

@Injectable({
  providedIn: 'root'
})
export class JobServiceService {

  baseUrl ;
  constructor(private httpClent:HttpClient) { 
    
    this.baseUrl = "http://localhost:8000/api/experience";
  
  }

  handleJobs(token:string){
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });    
    const jobsUrl = `${this.baseUrl}/getalljob`
    
    return this.httpClent.get<JobListResponse>(jobsUrl,{headers});
    
  }

  updateJobService(id:number,name:string,numberJob:number,description:string,userId:number,token:string){

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });  
    
    const updateJobUrl = `${this.baseUrl}/update/${id}`;
   
    const body = {name,numberJob,description,userId};
   
    return this.httpClent.post(updateJobUrl,body,{headers}); 
  
  }
createService(name:string,numberJob:number,description:string,userId:number,token:string){
  
  const headers = new HttpHeaders({
    'Authorization': 'Bearer ' + token
  });    
 
  const jobCreateUrl = `${this.baseUrl}/storejob`;
  
  const body = {name,numberJob,description,userId};
  
  return this.httpClent.post(jobCreateUrl,body,{headers});

}
}
