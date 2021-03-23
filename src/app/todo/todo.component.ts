import { Component, OnInit } from '@angular/core';
import { Task } from '../core/models/task.model';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  tasks: Task[] = [];

  constructor() {}

  ngOnInit(): void {}

  onTaskSubmitted(task: Task): void {
    this.tasks.push({ ...task });
  }

  onTaskUpdated(tasks: Task[]) {
    this.tasks = tasks;
  }
}
