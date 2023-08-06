import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'jquery';
import { Subject } from 'rxjs';
import { Jobs } from 'src/app/common/jobs';
import { ValidateNotWay } from 'src/app/common/validate-not-way';
import { JobServiceService } from 'src/app/service/job-service.service';
import { ServiceTokenService } from 'src/app/service/service-token.service';
import { UserService } from 'src/app/service/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-admin-job',
  templateUrl: './admin-job.component.html',
  styleUrls: ['./admin-job.component.css']
})
export class AdminJobComponent  implements OnInit{
 

  @ViewChild('content')  popupview!:ElementRef
  jobData:Jobs[] = [];
  dtoptions: DataTables.Settings = {};
  jobFormGroup:any;
  nameSave:string = "";
  updateId:number = 0;
  userIdSave:number = 0 ;
  descriptionSave:string = "";
  numberJobSave:number=0;
  dtTrigger:Subject<any> = new Subject<any>();
  ngOnInit(): void {

    this.jobFormGroup = this.formBuilder.group({
      
      jobForm: this.formBuilder.group({
       
        name:new FormControl('',[Validators.required,ValidateNotWay.notOnlyWhiteSpace,Validators.minLength(2)]),
       
        numberJob:new FormControl(''),
        
        description:new FormControl('',[Validators.required,ValidateNotWay.notOnlyWhiteSpace,Validators.minLength(3)]),
      })
    })
    this.dtoptions = {
      pagingType: 'full_numbers',
      searching:true,
      paging:true,
      lengthChange:true,
      language:{
        searchPlaceholder:'Search Job'
      }
  
      };
     
      this.handleListJob();

  }

  constructor(private serviceJob:JobServiceService,private formBuilder:FormBuilder
    ,private serviceToken:ServiceTokenService,private tokenService:ServiceTokenService,private router:Router){

  }

   get name(){
    
    return this.jobFormGroup.get('jobForm.name');
   
  }

  get numberJob(){

    return this.jobFormGroup.get('jobForm.numberJob');
  
  }

  get description(){
    
    return this.jobFormGroup.get('jobForm.description');
  }

  handleListJob(){
    const token: string | null = this.serviceToken.getToken(); // Replace this with your actual source of string or null

    if (token !== null) {
    this.serviceJob.handleJobs(token).subscribe(response=>{
    this.jobData = response.data;
   
      
    
      this.dtTrigger.next(null);  

      console.log(this.jobData); 

    },

    error=>{
   
      console.log("error"+error);
   
    })
  }
}

onEditJob(id:number){

  for( let job of this.jobData){

    id = job.id;

    if(job.id = id){
    
      this.updateId = job.id;
      
      this.nameSave = job.name;
    
     this.descriptionSave = job.description;
     
     this.numberJobSave = job.numberJob;

     console.log(this.nameSave+"  "+ this.descriptionSave+" "+this.numberJobSave);

  }
}
}

onUpdate(){
  this.nameSave = this.jobFormGroup.get('jobForm.name').value;

  this.descriptionSave = this.jobFormGroup.get('jobForm.description').value;

  this.numberJobSave = this.jobFormGroup.get('jobForm.numberJob').value;

  const userId: string | null = this.serviceToken.getUserId();

  if(userId !==null){

    this.userIdSave = parseInt(userId);

  }

  const token: string | null = this.serviceToken.getToken();

if(token !== null){
  this.serviceJob.updateJobService(this.updateId
    ,this.nameSave
    ,this.numberJobSave
    ,this.descriptionSave,this.userIdSave,token).subscribe(()=>{
    
      Swal.fire({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        icon: "success",
        timerProgressBar:true,
        timer: 5000,
        title: 'Update Jobs Successfully'
      });
    this.handleListJob();
    },
    (error)=>{
      Swal.fire({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        icon: "error",
        timerProgressBar:true,
        timer: 5000,
        title: 'Error Update Job '
      });
    })  
}

}
createJob(){

  this.nameSave = this.jobFormGroup.get('jobForm.name').value;

  this.descriptionSave = this.jobFormGroup.get('jobForm.description').value;

  this.numberJobSave = this.jobFormGroup.get('jobForm.numberJob').value;

  const userId: string | null = this.serviceToken.getUserId();

  if(userId !==null){

    this.userIdSave = parseInt(userId);

  }

  const token: string | null = this.serviceToken.getToken(); // Replace this with your actual source of string or null

    if (token !== null) {

      this.serviceJob.createService(this.nameSave,this.numberJobSave
 
      ,this.descriptionSave,this.userIdSave,token).subscribe(response=>{
  
      Swal.fire({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        icon: "success",
        timerProgressBar:true,
        timer: 5000,
        title: 'Add Job Successfully'
      });

      this.handleListJob();
  },
  error=>{

    Swal.fire({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      icon: "error",
      timerProgressBar:true,
      timer: 5000,
      title: 'Error Add Job '
    });
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
