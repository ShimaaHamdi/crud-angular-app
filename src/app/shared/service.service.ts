import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }

  //Create Data
  addEmployee(data:any):Observable<any>{
    return this.http.post("http://localhost:3000/employee", data) ;
  }

    // Update Data
    updateEmployee(id:number, data:any):Observable<any>{
      return 	this.http.put(`http://localhost:3000/employee/${id}`,data);
   }

  //Fetch Data
  getAllEmployee():Observable<any>{
    return this.http.get("http://localhost:3000/employee");
  }

  // Delete Data
  deleteEmployee(id:any):Observable<any>{
    return 	this.http.delete(`http://localhost:3000/employee/${id}`);
 }
}
