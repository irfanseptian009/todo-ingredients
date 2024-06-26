import React, { useState, useEffect } from "react";
import api from "./services/api.js";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import backgroundImage from "./assets/menu2.jpg";

function App() {
  const [todos, setTodos] = useState([]);
  const [editingTodo, setEditingTodo] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get("/todos")
      .then((res) => setTodos(res.data))
      .catch((err) => console.error(err));
  }, []);

  const addTodo = (text) => {
    api
      .post("/todos", { text, completed: false })
      .then((res) => {
        setTodos([...todos, res.data]);
        setError(null);
      })
      .catch((err) => setError("Error adding todo"));
  };

  const deleteTodo = (id) => {
    api
      .delete(`/todos/${id}`)
      .then(() => setTodos(todos.filter((todo) => todo.id !== id)))
      .catch((err) => console.error(err));
  };

  const updateTodo = (updatedTodo) => {
    api
      .put(`/todos/${updatedTodo.id}`, updatedTodo)
      .then(() => {
        setTodos(todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo)));
        setEditingTodo(null);
      })
      .catch((err) => console.error(err));
  };

  const toggleComplete = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    api
      .put(`/todos/${id}`, { ...todo, completed: !todo.completed })
      .then(() =>
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
          )
        )
      )
      .catch((err) => console.error(err));
  };

  return (
    <div
      className="bg-yellow-100 min-h-screen p-8 flex flex-col items-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h1 className="text-3xl font-bold mb-6 text-center">Catatan Membeli Bumbu Dapur</h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          <p>{error}</p>
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <TodoForm addTodo={addTodo} todo={editingTodo} updateTodo={updateTodo} />
        <TodoList
          todos={todos}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
          toggleComplete={toggleComplete}
          setEditingTodo={setEditingTodo}
        />
      </div>
    </div>
  );
}

export default App;
