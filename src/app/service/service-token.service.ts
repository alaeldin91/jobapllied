import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceTokenService {
  
  private readonly TOKEN_KEY = "access-token";
  private readonly USERID = "access-UserId";


  constructor() { }
/**
 * 
 * @param token 
 */
  saveToken(token:string):void{
    localStorage.setItem(this.TOKEN_KEY,token);
   }

   saveUserId(userId:string){

    localStorage.setItem(this.USERID,userId)
   }
   
   /**
    * 
    * @returns 
    */
   getUserId(): string | null{
    return localStorage.getItem(this.USERID);

  }


   /**
    * 
    * @returns 
    */
   getToken(): string | null{
     return localStorage.getItem(this.TOKEN_KEY);
 
   } 

   /**
 * remove Token
 */
   removeUserId(): void {
    localStorage.removeItem(this.USERID);
  }
 
/**
 * remove Token
 */
   removeToken(): void {
     localStorage.removeItem(this.TOKEN_KEY);
   }
}


