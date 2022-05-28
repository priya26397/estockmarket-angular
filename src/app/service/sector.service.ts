import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SectorService {
  url="http://localhost:6093";
  constructor(private httpClient: HttpClient) { }
  getSector(){
    const fetchUrl=this.url+"/api/v1.0/query/market/sector/getAll";
    return this.httpClient.get(fetchUrl);
  }
  createSector(data:any){
    let token=sessionStorage.getItem('token');
    const httpOptions={
      headers:new HttpHeaders({
        Authorization:'Bearer '+token
      })
    }
    const createUrl="http://localhost:6092/api/v1.0/command/market/sector/create";
    return this.httpClient.post(createUrl, data,httpOptions);
  }
  deleteSector(id:string){
    let token=sessionStorage.getItem('token');
    const httpOptions={
      headers:new HttpHeaders({
        Authorization:'Bearer '+token
      })
    }
    const deleteUrl="http://localhost:6092/api/v1.0/command/market/sector/"+id;
    return this.httpClient.delete(deleteUrl,httpOptions);
  }
}
