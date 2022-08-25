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
  actionButton: string = "Save";

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,
  ) { }

  ngOnInit(): void {
    this.todoForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      status: ['', Validators.required]
    })

    if (this.editData) {
      this.actionButton = "Update"
      this.todoForm.controls['title'].setValue(this.editData.title);
      this.todoForm.controls['description'].setValue(this.editData.description);
      this.todoForm.controls['status'].setValue(this.editData.status);
    }
  }

  // add a task to db.json
  addTask() {
    if (!this.editData) {
      if (this.todoForm.valid) {
        this.api.postTodo(this.todoForm.value).subscribe({
          next: (res) => {
            alert("Task added successfuly");
            this.todoForm.reset();
            this.dialogRef.close('save');
            window.location.reload();
          },
          error: () => {
            alert("Error while adding the task");
          }
        })
      }
    } else {
      this.updateTask();
    }
  }

  // update Task in db.json
  updateTask() {
    this.api.putTodo(this.todoForm.value, this.editData.id)
    .subscribe({
      next: (res) => {
        alert("Todo task updated successfully");
        this.todoForm.reset();
        this.dialogRef.close('update');
      },
      error:() => {
        alert("Error while updating Todo task");
      }
    })
  }

}
