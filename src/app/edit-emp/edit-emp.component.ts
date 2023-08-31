import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServiceService } from '../shared/service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-emp',
  templateUrl: './edit-emp.component.html',
  styleUrls: ['./edit-emp.component.scss']
})
export class EditEmpComponent implements OnInit {
  empForm: FormGroup;
  education: string[] = ['Matric', 'Diploma', 'Intermediate', 'Gradutate', 'Post Graduate']
  constructor(private fb: FormBuilder, private service: ServiceService, private dialogref: MatDialogRef<EditEmpComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.empForm = this.fb.group({
      firstname: '',
      lastname: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
       exp: '',
      package: ''

    })
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data)
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      if (this.data) {
        this.service.updateEmployee(this.data.id,this.empForm.value).subscribe({
          next: (val: any) => {
            alert("Employee Details Updated Succesfull 0")
            this.dialogref.close(true)
          },
          error: (err: any) => {
            alert(err);
          }
        });
      } else {
        this.service.addEmployee(this.empForm.value).subscribe({
          next: (val: any) => {
            alert("Employee Added Successfully")
            this.dialogref.close(true)
          },
          error: (err: any) => {
            alert(err);
          }
        })
      }

    }
  }
}
