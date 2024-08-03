import React, { useState } from "react";
import { Todo } from "@/types/todo";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onEdit: (id: number, text: string) => void;
  onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onEdit,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (isEditing) {
      onEdit(todo.id, editText);
    }
    setIsEditing(!isEditing);
  };

  return (
    <li className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-grow">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
            className="form-checkbox h-5 w-5 text-blue-500"
          />
          {isEditing ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="flex-grow border-b border-gray-300 focus:outline-none focus:border-blue-500 py-1"
            />
          ) : (
            <span
              className={`flex-grow ${
                todo.completed ? "line-through text-gray-500" : ""
              }`}
            >
              {todo.text}
            </span>
          )}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={handleEdit}
            className={`text-sm px-3 py-1 rounded ${
              isEditing
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-blue-100 hover:bg-blue-200 text-blue-800"
            } transition duration-200`}
          >
            {isEditing ? "Save" : "Edit"}
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className="text-sm px-3 py-1 rounded bg-red-100 hover:bg-red-200 text-red-800 transition duration-200"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
