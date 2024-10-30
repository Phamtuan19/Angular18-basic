export interface Todo {
  id: number;
  title: string;
  priority: number;
  createdAt: Date;
  deadline?: Date;
  completed?: boolean;
}
