import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Jobs } from 'src/app/common/jobs';
import { ValidateNotWay } from 'src/app/common/validate-not-way';
import { JobServiceService } from 'src/app/service/job-service.service';
import { ServiceTokenService } from 'src/app/service/service-token.service';

@Component({
  selector: 'app-apply-job',
  templateUrl: './apply-job.component.html',
  styleUrls: ['./apply-job.component.css']
})
export class ApplyJobComponent implements OnInit {
  jobData:Jobs[] = [];
  dtoptions: DataTables.Settings = {};
  dtTrigger:Subject<any> = new Subject<any>();
  jobApplyFormGroup:any;



  constructor(private jobService:JobServiceService,private serviceToken:ServiceTokenService
    ,private formBuilder:FormBuilder){

  }
  ngOnInit(): void {
  this.jobApplyFormGroup = this.formBuilder.group({
    jobApplyForm:this.formBuilder.group({
      
      name: new FormControl('',[Validators.required
        ,ValidateNotWay.notOnlyWhiteSpace,Validators.minLength(2)]),
      
      mobileNumber:new FormControl('',[Validators.required
        ,ValidateNotWay.notOnlyWhiteSpace,Validators.minLength(10)]),
      
      cvText:new FormControl('',[Validators.required
        ,ValidateNotWay.notOnlyWhiteSpace,Validators.minLength(2)]),
      
      cv:new FormControl('',[Validators.required]),
      
      jobTitleId:new FormControl('',[Validators.required]),

      company:new FormControl('',[Validators.required
        ,ValidateNotWay.notOnlyWhiteSpace,Validators.minLength(2)]),

        dateStart: new FormControl('',[Validators.required]),
     
        industry: new FormControl('',[Validators.required]),

        higestLevel: new FormControl('',[Validators.required
        
        ,ValidateNotWay.notOnlyWhiteSpace,Validators.minLength(4)]),

        school: new FormControl('',[Validators.required
        
        ,ValidateNotWay.notOnlyWhiteSpace,Validators.minLength(2)]),

        dateComplated: new FormControl('',[Validators.required]),

        nameSkills: new FormControl('',[Validators.required
        
        ,ValidateNotWay.notOnlyWhiteSpace,Validators.minLength(3)]),
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
  
  get name(){
    
    return this.jobApplyFormGroup.get('jobApplyForm.name');
  
  }

  get mobileNumber(){

    return this.jobApplyFormGroup.get('jobApplyForm.mobileNumber');
  
  }

  get cvText(){

    return this.jobApplyFormGroup.get('jobApplyForm.cvText');
  
  }

  get cv(){

  return this.jobApplyFormGroup.get('jobApplyForm.cv');
  
  }

  get jobTitleId(){

  return this.jobApplyFormGroup.get('jobApplyForm.jobTitleId');
  
  }

  get company(){

    return this.jobApplyFormGroup.get('jobApplyForm.company');
  
  }

  get dateStart(){

    return this.jobApplyFormGroup.get('jobApplyForm.dateStart');
  
  }

  get industry(){

    return this.jobApplyFormGroup.get('jobApplyForm.industry');
  
  }

  get higestLevel(){
   
    return this.jobApplyFormGroup.get('jobApplyForm.higestLevel');
  
  }

  get school(){

    return this.jobApplyFormGroup.get('jobApplyForm.school');
  
  }

  get dateComplated(){
    
    return this.jobApplyFormGroup.get('jobApplyForm.dateComplated');
  
  }

  get nameSkills(){

    return this.jobApplyFormGroup.get('jobApplyForm.completed');
  
  }
  
  handleListJob() {
  
    const token: string | null = this.serviceToken.getToken(); // Replace this with your actual source of string or null

    if (token !== null) {
    this.jobService.handleJobs(token).subscribe(response=>{
    this.jobData = response.data;
   this.dtTrigger.next(null);  
   console.log(this.jobData); 

    },

    error=>{
   
      console.log("error"+error);
   
    })
  }
  }

}
