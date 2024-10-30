import { Injectable } from '@angular/core';
import { Todo } from './todo.interface';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todos: Todo[] = [
    {
      id: 1,
      createdAt: new Date('2024-10-01T10:00:00'), // Ngày tạo
      priority: 1,
      title: 'Kiểm tra API',
      deadline: new Date('2024-10-12T15:12:00'), // Hạn cuối
      completed: false,
    },
    {
      id: 2,
      createdAt: new Date('2024-10-02T11:30:00'),
      priority: 2,
      title: 'Thiết kế giao diện người dùng',
      deadline: new Date('2024-10-15T12:00:00'),
      completed: false,
    },
    {
      id: 3,
      createdAt: new Date('2024-10-03T09:15:00'),
      priority: 3,
      title: 'Viết tài liệu dự án',
      deadline: new Date('2024-10-20T09:00:00'),
      completed: false,
    },
    {
      id: 4,
      createdAt: new Date('2024-10-04T14:45:00'),
      priority: 2,
      title: 'Thực hiện kiểm thử',
      deadline: new Date('2024-10-22T18:00:00'),
      completed: false,
    },
  ];

  constructor() {}

  public getTodos(): Todo[] {
    return this.todos;
  }

  public addTodo(todo: Todo): void {
    this.todos.push(todo);
  }

  public deleteTodo(todoId: number): void {
    this.todos = this.todos.filter((todo) => todo.id !== todoId);
  }

  public updateTodo(updatedTodo: Todo): void {
    const index = this.todos.findIndex((todo) => todo.id === updatedTodo.id);
    if (index !== -1) {
      this.todos[index] = updatedTodo;
    }
  }

  public toggleTodoComplete(todoId: number) {
    const todo = this.todos.find((t) => t.id === todoId);
    if (todo) {
      todo.completed = !todo.completed; // Đảo ngược trạng thái hoàn thành
    }
  }
}
