import React, { useState } from "react";
import { createTodo } from "../services/api.js";

function TodoInput({ onAddTodo }) {
  const [newTodo, setNewTodo] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      const todo = { title: newTodo, completed: false };
      try {
        const res = await createTodo(todo);
        onAddTodo(res.data);
        setNewTodo("");
      } catch (error) {
        console.error("Error adding todo:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add new todo..."
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default TodoInput;
