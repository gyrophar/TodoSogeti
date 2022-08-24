import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent implements OnInit {

  todoForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private api : ApiService,
    private dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData : any,
  ) { }

  ngOnInit(): void {
    this.todoForm = this.formBuilder.group({
      title : ['', Validators.required],
      description : [''],
      status : ['', Validators.required] 
    })

    console.log(this.editData);
  }

  addTask() {
    if(this.todoForm.valid) {
      this.api.postTodo(this.todoForm.value).subscribe({
        next:(res) => {
          alert("Task added successfuly");
          this.todoForm.reset();
          this.dialogRef.close('save');
        },
        error:() => {
          alert("Error while adding the task");
        }
      })
    }
  }

}
