export interface Jobs {
    id:number;
    name:string;
    numberJob:number;
    description:string;
    userId:number;
    created_at: string;
    updated_at: string;
    
}

export interface JobListResponse {
    current_page: number;
    data: Jobs[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  }
  
