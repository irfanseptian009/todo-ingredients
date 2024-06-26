import React, { useState } from "react";

function TodoForm({ addTodo, todo, updateTodo, isEditing, setIsEditing }) {
  const [text, setText] = useState(todo ? todo.text : "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() !== "") {
      if (todo) {
        updateTodo({ ...todo, text });
      } else {
        addTodo(text);
      }
      setText("");
    } else {
      alert("Tugas tidak boleh kosong!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Tulis tugas baru..."
        className="border border-gray-300 rounded-md px-4 py-2 flex-grow focus:outline-none focus:ring focus:border-blue-300"
      />
      <button
        type="submit"
        className={`px-4 py-2 rounded-md ${
          todo ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"
        } text-white font-semibold focus:outline-none focus:ring focus:ring-offset-2 focus:ring-blue-500`}
      >
        {todo ? "Perbarui" : "Tambah"}
      </button>
    </form>
  );
}

export default TodoForm;
