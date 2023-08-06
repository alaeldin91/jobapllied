import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder,Validators,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from 'src/app/common/user';
import { ValidateNotWay } from 'src/app/common/validate-not-way';
import { ServiceTokenService } from 'src/app/service/service-token.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent  implements OnInit {

  nameSave:string = "";
  emailSave:string = "";
  passwordSave:string="";
 

  mobileNumberSave:string="";
  @ViewChild('content')  popupview!: ElementRef;
  constructor(private userService:UserService
    ,private formBuilder:FormBuilder,private router:Router
    ,private tokenService:ServiceTokenService){
  }
  
  userFormGroup:any
  ngOnInit(): void {
  
    

    this.userFormGroup = this.formBuilder.group({
      userForm:this.formBuilder.group({
      name :new FormControl('',[Validators.required,ValidateNotWay.notOnlyWhiteSpace,Validators.minLength(3)]),
      email:new FormControl('',[Validators.required,ValidateNotWay.notOnlyWhiteSpace,Validators.minLength(3)]),
      password:new FormControl('',[Validators.required,ValidateNotWay.notOnlyWhiteSpace,Validators.minLength(3)]),
      mobileNumber:new FormControl('',[Validators.required,ValidateNotWay.notOnlyWhiteSpace])

      })
    })
  
  }
  
  get name(){
   
    return this.userFormGroup.get('userForm.name');
  
  }

  get email(){
  
    return this.userFormGroup.get('userForm.email');
  
  }

  get password(){

    return this.userFormGroup.get('userForm.password');
  
  }

  get mobileNumber(){

    return this.userFormGroup.get('userForm.mobileNumber');
  
  }


  public register(){
    
    this.nameSave  = this.userFormGroup.get('userForm.name').value;
   
    this.emailSave =  this.userFormGroup.get('userForm.email').value;
   
    this.passwordSave = this.userFormGroup.get('userForm.password').value;
   
    this.mobileNumberSave = this.userFormGroup.get('userForm.mobileNumber').value;
     console.log(this.nameSave+"  "+this.emailSave);
    this.userService.registerService(this.nameSave,this.emailSave
      
      ,this.passwordSave,
     
      this.mobileNumberSave).subscribe((response)=>{
        
        this.router.navigate(['/login']);
   
    },

    (error)=>{
    
     console.log("error"+error);

    }
    )
  
    
  }

  
}
