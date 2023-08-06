import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserListResponse } from '../common/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl;
  private isAuthenticat:boolean = false;
  
  constructor(private HttpClient: HttpClient) {
   
    this.baseUrl ="http://localhost:8000/api"
   
  }
  
  /**
   * 
   * @param name 
   * @param email 
   * @param password 
   * @param mobileNumber 
   * @returns 
   */
  public registerService(name:string,email:string,password:string ,mobileNumber:string){

    const registerUrl = `${this.baseUrl}/user/register`;
    
    const body ={name,email,password,mobileNumber};
    
    return this.HttpClient.post(registerUrl,body);

  }

/**
 * 
 * @param email 
 * @param password 
 * @returns 
 */  
  public loginService(email:string,password:string){
  
   
    const loginUrl = `${this.baseUrl}/user/login`;
  
    const body = {email,password};
 
    return this.HttpClient.post(loginUrl,body);
  }

  /**
   * 
   * @returns 
   */

  isAuthenticated(): boolean {
    // Check if the user is authenticated
     // For example, you can check for a valid token, session, or any other criteria
     // Example: Get token from localStorage
       
     // Set the isAuthenticated property based on the authentication status
    
     return  localStorage.getItem('access-token') ? true : false;
   }

   getUserById(id:number,token:string){

    const headers = new HttpHeaders({

      'Authorization': 'Bearer ' + token

    }); 
  
    const userByIdUrl = `${this.baseUrl}/user/byname/${id}`;
    
    return this.HttpClient.get(userByIdUrl,{headers});
  
  }

  getUsers(token:string){
    
    const headers = new HttpHeaders({

      'Authorization': 'Bearer ' + token

    });
    
    const usersUrl = `${this.baseUrl}/users`;

    return this.HttpClient.get<UserListResponse>(usersUrl,{headers});
  
  }

  

}
