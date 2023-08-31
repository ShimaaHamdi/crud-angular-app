import { DialogRef } from '@angular/cdk/dialog';
import { Component, OnInit, ViewChild } from '@angular/core';
import { EditEmpComponent } from './edit-emp/edit-emp.component';
import { MatDialog } from '@angular/material/dialog';
import { ServiceService } from './shared/service.service';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title(title: any) {

  }

  displayedColumns: string[] = [
    'id',
    'firstname',
    'lastname',
    'email',
    'dob',
    'gender',
    'education',
    'exp',
    'package',
    'action'
  ];
  // dataSource!: MatTableDataSource<any>;
  dataSource: MatTableDataSource<any> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

  }

  constructor(private dialog: MatDialog, private service: ServiceService) { }
  ngOnInit(): void {
    this.getEmployeeList();
  }
  openEditEmpForm() {
    const DialogRef = this.dialog.open(EditEmpComponent);
    DialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      }
    })
  }


  editForm(data:any){
   const dialogRef =  this.dialog.open(EditEmpComponent,{
      data,
    });
    dialogRef.afterClosed().subscribe({
      next:(val)=>{
        if(val){
          this.getEmployeeList();
        }
      }
    })

  }
  getEmployeeList() {
    this.service.getAllEmployee().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator
      },
      error: (err) => {
        alert(err);
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteEmp(id: number) {
    this.service.deleteEmployee(id).subscribe({
      next: (res) => {
        alert('Employee Deleted Sucessfully!')
        this.getEmployeeList
      },
      error: (err) => alert("Error")
    })
  }

  // editForm(data: any) {
  //   const dialogRef = this.dialog.open(EditEmpComponent, {
  //     data,
  //   });
  //   dialogRef.afterClosed().subscribe({
  //     next:(val)=>{
  //       if(val){
  //         this.getEmployeeList();
  //       }
  //     }
  //   })
  // }
}
