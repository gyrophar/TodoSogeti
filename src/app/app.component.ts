import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TaskDialogComponent } from './modals/task-dialog/task-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TodoApp';

  constructor(private dialog: MatDialog) { }


  ngOnInit(): void {
  }

  openDialog() {
    this.dialog.open(TaskDialogComponent, {
      width: '30%'
    }).afterClosed().subscribe( () => {
      window.location.reload();
    });
  }

}
