import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Jobs } from 'src/app/common/jobs';
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


  constructor(private jobService:JobServiceService,private serviceToken:ServiceTokenService){

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
    this.handleListJob();  
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
