"use client";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import {
  addTodo,
  updateTodo,
  toggleTodo,
  deleteTodo,
} from "@/store/slices/todoSlice";

export default function Note() {
  const [newTodo, setNewTodo] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editText, setEditText] = useState("");

  // READ: Get todos from Redux store
  const todos = useAppSelector((state) => state.todos.items);

  // Get dispatch function
  const dispatch = useAppDispatch();

  // CREATE
  const handleAdd = () => {
    if (newTodo.trim()) {
      dispatch(addTodo(newTodo));
      setNewTodo("");
    }
  };

  // UPDATE
  const handleUpdate = (id: number) => {
    if (editText.trim()) {
      dispatch(updateTodo({ id, title: editText }));
      setEditId(null);
      setEditText("");
    }
  };

  // DELETE
  const handleDelete = (id: number) => {
    dispatch(deleteTodo(id));
  };

  // TOGGLE
  const handleToggle = (id: number) => {
    dispatch(toggleTodo(id));
  };

  return (
    <div className="min-h-screen py-8">
      <div className="p-6 max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          Redux CRUD Todo List
        </h1>

        {/* CREATE Section */}
        <div className="mb-6 flex gap-2">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAdd()}
            placeholder="Add a new todo..."
            className="flex-1 px-4 py-2 bg-slate-800 border caret-gray-200 placeholder-gray-500 border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
          />
          <button
            onClick={handleAdd}
            className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 hover:cursor-pointer transition-colors font-medium"
          >
            Add
          </button>
        </div>

        {/* READ & UPDATE & DELETE Section */}
        <div className="space-y-3">
          {todos.length === 0 ? (
            <p className="text-center text-gray-300 py-8">
              No todos yet. Add one above!
            </p>
          ) : (
            todos.map((todo) => (
              <div
                key={todo.id}
                className="flex flex-wrap items-center gap-3 p-4 bg-white rounded-lg min-h-[60px]"
              >
                {/* Toggle checkbox */}
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggle(todo.id)}
                  className="w-5 h-5 cursor-pointer shrink-0"
                />

                {/* Display or Edit mode */}
                {editId === todo.id ? (
                  <>
                    <input
                      type="text"
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      onKeyPress={(e) =>
                        e.key === "Enter" && handleUpdate(todo.id)
                      }
                      className="flex-1 min-w-[200px] px-3 py-2 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                      autoFocus
                    />
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => handleUpdate(todo.id)}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 hover:cursor-pointer transition-colors text-sm whitespace-nowrap"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditId(null);
                          setEditText("");
                        }}
                        className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 hover:cursor-pointer transition-colors text-sm whitespace-nowrap"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <span
                      className={`flex-1 min-w-[200px] wrap-break-word ${
                        todo.completed
                          ? "line-through text-gray-400"
                          : "text-gray-700"
                      }`}
                    >
                      {todo.title}
                    </span>
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={() => {
                          setEditId(todo.id);
                          setEditText(todo.title);
                        }}
                        className="px-4 py-2 bg-amber-400 hover:cursor-pointer text-white rounded hover:bg-amber-500 transition-colors text-sm whitespace-nowrap"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(todo.id)}
                        className="px-4 py-2 bg-red-500 text-white hover:cursor-pointer rounded hover:bg-red-600 transition-colors text-sm whitespace-nowrap"
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>

        {/* Stats */}
        {todos.length > 0 && (
          <div className="mt-6 pt-6 border-t border-gray-600 text-center text-sm text-white">
            <p>
              Total: {todos.length} | Completed:{" "}
              {todos.filter((t) => t.completed).length} | Active:{" "}
              {todos.filter((t) => !t.completed).length}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}