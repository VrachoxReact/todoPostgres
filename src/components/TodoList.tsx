import React from "react";
import TodoItem from "./TodoItem";
import { Todo } from "@/types/todo";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onEdit: (id: number, text: string) => void;
  onDelete: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggle,
  onEdit,
  onDelete,
}) => {
  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export default TodoList;
