import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css']
})
export class TodoDetailComponent implements OnInit {

  routeId!: string;
  cardData: any;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.routeId = param['id'];
    });
    this.getTodoDetail(this.routeId);
  }

  getTodoDetail(id: any) {
    this.api.getTodo(id).subscribe({
      next: (res) => {
        this.cardData = res;
      },
    }
    )
  }

  changeTodoStatus(data: any) {
    data.status = !data.status;
    this.api.putTodoStatus(data, data.id);
  }

}
