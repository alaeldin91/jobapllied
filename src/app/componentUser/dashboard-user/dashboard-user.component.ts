import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from 'src/app/common/user';
import { ServiceTokenService } from 'src/app/service/service-token.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.css']
})
export class DashboardUserComponent implements OnInit{

  @ViewChild('content') popupview!:ElementRef
  usersData:User[] = [];
  dtoptions: DataTables.Settings = {};
  dtTrigger:Subject<any> = new Subject<any>();

  constructor(private userService:UserService,private tokenService:ServiceTokenService,private router:Router){

  }
  ngOnInit(): void {

    this.dtoptions = {
      pagingType: 'full_numbers',
      searching:true,
      paging:true,
      lengthChange:true,
      language:{
        searchPlaceholder:'Search Job'
      }
  
      };
  
      this.handleListUsers();
   
  }
  handleListUsers() {
    
    const token: string | null = this.tokenService.getToken();

    if(token !== null){
    
      this.userService.getUsers(token).subscribe(response=>{
       
        this.usersData = response.data;

        this.dtTrigger.next(null);  

      console.log(this.usersData); 
    
      },
      (error)=>{
        console.log(error);
      })
  }
  
  }

  logout(){
    this.tokenService.removeUserId();
    this.tokenService.removeToken();
    this.router.navigate(['/login']);

  }
}
