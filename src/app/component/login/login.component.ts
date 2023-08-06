import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/common/auth-guard';
import { ValidateNotWay } from 'src/app/common/validate-not-way';
import { ServiceTokenService } from 'src/app/service/service-token.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{
  

  constructor(private userService:UserService
    ,private formBuilder:FormBuilder,private router:Router,private serviceToken:ServiceTokenService
    ,private authGuard:AuthGuard){

  }
  data:any;
  userFormGroup:any;
  emailSave:string = "";
  passwordSave:string =""
  ngOnInit(): void {
  this.userFormGroup = this.formBuilder.group({
    userForm: this.formBuilder.group({
      email:new FormControl('',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),ValidateNotWay.notOnlyWhiteSpace]),
      password:new FormControl('',[Validators.required,ValidateNotWay.notOnlyWhiteSpace,Validators.minLength(7)]),
  })
  })    
  
 
  }
  get email(){
    return this.userFormGroup.get('userForm.email');
  }

  get password(){
    
    return this.userFormGroup.get('userForm.password');
  
  }
  login(){
    
    this.emailSave = this.userFormGroup.get('userForm.email').value; 

    this.passwordSave = this.userFormGroup.get('userForm.password').value;

     this.userService.loginService(this.emailSave,this.passwordSave).subscribe(response=>{

    this.data = response;

    if((this.data.status = true) &&(this.data.user.roleId==2)){
    
    this.serviceToken.saveToken(this.data.token);
    this.serviceToken.saveUserId(this.data.user.id);

    this.router.navigate(["/adminjob"]);

    }

    else if(this.data.status == true && (this.data.user.roleId == 1)){
    
      this.serviceToken.saveToken(this.data.token);
      this.serviceToken.saveUserId(this.data.user.id);
      this.router.navigate(["/applyjob"]);

    }

},
    (error)=>{
      
      Swal.fire({
        title: 'Login Failed',
        text: 'Please Check u email or password',
        icon: 'error',
        timer: 3000, // Set the timer to 3000 milliseconds (3 seconds)
        timerProgressBar: true, // Display a progress bar indicating the remaining time
       
      });
     })
  }
}
