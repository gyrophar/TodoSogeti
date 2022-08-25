import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  displayedColumns: string[] = ['id', 'title', 'status', 'actions', 'checkDetails', 'delete'];
  dataSource!:  MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private api : ApiService,
  ) { }

  ngOnInit(): void {
    this.getTodos();
  }

  // get all Todos information from db.json
  getTodos() {
    this.api.getAllTodos().subscribe({
      next:(res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err) => {
        alert('Error while fetching Todos')
      }
    })
  }

  // filters todo tasks with user entry
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // toggles Todo status in DB.json
  changeTodoStatus(rowData: any) {
    rowData.status = !rowData.status
    this.api.putTodo(rowData, rowData.id).subscribe();
    window.location.reload();
  }

  // Deletes a task from db.json
  deleteTodo(rowData: any) {
    this.api.deleteTodo(rowData.id).subscribe({
      next:(res) => {
        alert("Task successfully deleted");
      },
      error:(err) => {
        alert("Error while deleting task")
      }
    });
    window.location.reload();
  }
}
