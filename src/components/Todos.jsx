import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeTodo, editTodo } from "../features/todo/todoSlice";

function Todos() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [editedText, setEditedText] = useState(""); // State for edited text
  const [editTodoId, setEditTodoId] = useState(null); // State to track which todo is being edited

  const handleEdit = (todo) => {
    setEditedText(todo.text);
    setEditTodoId(todo.id);
  };

  const handleSaveEdit = () => {
    if (editTodoId !== null && editedText.trim() !== "") {
      dispatch(editTodo({ id: editTodoId, newText: editedText }));
      setEditTodoId(null);
      setEditedText("");
    }
  };

  return (
    <>
      <div>Todos</div>
      <ul className="list-none">
        {todos.map((todo) => (
          <li
            className="mt-4 flex justify-between items-center bg-zinc-800 px-4 py-2 rounded"
            key={todo.id}
          >
            <div className="text-white">{todo.text}</div>

            {editTodoId === todo.id ? (
              <>
                <input
                  className="newInput"
                  type="text"
                  value={editedText}
                  onChange={(e) => setEditedText(e.target.value)}
                />
                <button
                  onClick={handleSaveEdit}
                  className="text-white bg-green-500 border-0 py-1 px-4 focus:outline-none hover:bg-green-600 rounded text-md"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleEdit(todo)}
                  className="text-white bg-blue-500 border-0 py-1 px-4 focus:outline-none hover:bg-blue-600 rounded text-md"
                >
                  Edit
                </button>

                <button
                  onClick={() => dispatch(removeTodo(todo.id))}
                  className="text-white bg-red-500 border-0 py-1 px-4 focus:outline-none hover:bg-red-600 rounded text-md"
                >
                  X
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Todos;
