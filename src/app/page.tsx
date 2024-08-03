"use client";

import React, { useState, useEffect } from "react";
import AddTodo from "@/components/AddTodo";
import TodoList from "@/components/TodoList";
import { Todo } from "@/types/todo";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch("/api/todos");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const text = await response.text();
      console.log("API Response:", text);
      const data = JSON.parse(text);
      setTodos(data);
    } catch (error) {
      console.error("Fetching todos failed:", error);
      // Set an error state or show an error message to the user
    }
  };

  const addTodo = async (text: string) => {
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const newTodo = await response.json();
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = async (id: number) => {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      const response = await fetch("/api/todos", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...todo, completed: !todo.completed }),
      });
      const updatedTodo = await response.json();
      setTodos(todos.map((t) => (t.id === id ? updatedTodo : t)));
    }
  };

  const editTodo = async (id: number, text: string) => {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      const response = await fetch("/api/todos", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...todo, text }),
      });
      const updatedTodo = await response.json();
      setTodos(todos.map((t) => (t.id === id ? updatedTodo : t)));
    }
  };

  const deleteTodo = async (id: number) => {
    await fetch("/api/todos", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="bg-blue-500 text-white py-4 px-6">
        <h1 className="text-3xl font-bold">Todo List</h1>
      </div>
      <div className="p-6">
        <AddTodo onAdd={addTodo} />
        <TodoList
          todos={todos}
          onToggle={toggleTodo}
          onEdit={editTodo}
          onDelete={deleteTodo}
        />
      </div>
    </div>
  );
}
