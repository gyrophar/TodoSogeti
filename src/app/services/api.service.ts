import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postTodo(data: any) {
    return this.http.post<any>("http://localhost:3000/todos/", data);
  }

  getAllTodos() {
    return this.http.get<any>("http://localhost:3000/todos/");
  }

  getTodo(id: number) {
    return this.http.get<any>("http://localhost:3000/todos/"+id);
  }

  putTodoStatus(data: any, id: number) {
    return this.http.put<any>("http://localhost:3000/todos/"+id, data)
    .subscribe()
  }

}
