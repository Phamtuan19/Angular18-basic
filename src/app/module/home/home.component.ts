import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastService } from '~services/toast.service';
import { Todo } from '~services/todo/todo.interface';
import { TodoService } from '~services/todo/todo.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public listTodo: Todo[] = [];
  public isEditing: boolean = false;
  public currentTodoId: number | null = null;

  public readonly priorities = [
    { value: 1, label: 'Thấp (Low)' },
    { value: 2, label: 'Trung bình (Medium)' },
    { value: 3, label: 'Cao (High)' },
  ];

  // Form for adding todo
  public formTodo: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required]),
    priority: new FormControl('', [Validators.required]),
    deadline: new FormControl('', []),
  });

  constructor(
    private todoService: TodoService,
    private toastService: ToastService
  ) {
    this.loadTodos();
  }

  private loadTodos(): void {
    this.listTodo = this.todoService.getTodos();
  }

  public onSubmit(): void {
    if (this.formTodo.invalid) {
      return this.toastService.show(
        'Vui lòng nhập đầy đủ thông tin!!!',
        'error'
      );
    }

    const todoData: Todo = this.prepareTodoData();

    if (this.isEditing) {
      this.todoService.updateTodo(todoData);
      this.toastService.show('Cập nhật công việc thành công!!!', 'success');
    } else {
      this.todoService.addTodo(todoData);
      this.toastService.show('Thêm task công việc thành công!!!', 'success');
    }

    this.resetForm();
  }

  private prepareTodoData(): Todo {
    const currentTodo =
      this.currentTodoId !== null
        ? this.listTodo.find((todo) => todo.id === this.currentTodoId)
        : null;

    return {
      id:
        this.currentTodoId !== null
          ? this.currentTodoId
          : this.listTodo.length + 1,
      title: this.formTodo.value.title,
      priority: this.formTodo.value.priority,
      createdAt: currentTodo ? currentTodo.createdAt : new Date(),
      deadline: this.formTodo.value.deadline
        ? new Date(this.formTodo.value.deadline)
        : undefined,
      completed: currentTodo?.completed,
    };
  }

  public editTodo(todo: Todo): void {
    this.isEditing = true;
    this.currentTodoId = todo.id;
    this.formTodo.patchValue({
      title: todo.title,
      priority: todo.priority,
      deadline: todo.deadline
        ? todo.deadline.toISOString().substring(0, 16)
        : null,
    });
  }

  public deleteTodo(todoId: number): void {
    this.todoService.deleteTodo(todoId);
    this.loadTodos();
  }

  public getPriorityLabel(priorityValue: number): string {
    const priority = this.priorities.find((p) => p.value === priorityValue);
    return priority ? priority.label : '';
  }

  public cancelEdit(): void {
    this.isEditing = false;
    this.currentTodoId = null;
    this.resetForm();
  }

  private resetForm(): void {
    this.formTodo.reset();
    this.loadTodos();
    this.isEditing = false;
    this.currentTodoId = null;
  }

  public toggleComplete(todo: Todo): void {
    this.todoService.toggleTodoComplete(todo.id);
    this.loadTodos();
    this.toastService.show('Công việc đã được hoàn thành!!!', 'success');
  }
}
