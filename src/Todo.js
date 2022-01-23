import React from "react";
import { ACTIONS } from "./App";
import "./Styles.css";
import { FaTrashAlt } from "react-icons/fa";

function Todo({ todo, dispatch }) {
  return (
    <div className="todo-list-container">
      <div>{todo.name}</div>
      <button
        onClick={() =>
          dispatch({ type: ACTIONS.DELETE_TODO, payload: { id: todo.id } })
        }
      >
        <FaTrashAlt className="delete-button" />
      </button>
    </div>
  );
}

export default Todo;
