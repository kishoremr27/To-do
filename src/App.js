import React, { useReducer, useState } from "react";
import Todo from "./Todo";
import "./Styles.css";
import { FaPlus } from "react-icons/fa";

export const ACTIONS = {
  ADD_TODO: "add-todo",
  DELETE_TODO: "delete-todo",
  CLEAR_ALL: "clear-all",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_TODO: {
      return [...state, newTodo(action.payload.name)];
    }
    case ACTIONS.DELETE_TODO: {
      return state.filter((elements) => elements.id !== action.payload.id);
    }
    case ACTIONS.CLEAR_ALL: {
      return (state = []);
    }
  }
}

function newTodo(name) {
  return {
    id: Date.now(),
    name: name,
  };
}

function App() {
  const [name, setName] = useState("");
  const [todos, dispatch] = useReducer(reducer, []);

  let changeName = (e) => setName(e.target.value);

  let handleSubmit = (e) => {
    e.preventDefault();
    setName("");
    if (name.length !== 0) {
      dispatch({ type: ACTIONS.ADD_TODO, payload: { name: name } });
    }
  };

  return (
    <div className="container">
      <h2>Todo App</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          placeholder="Add your new todo"
          onChange={changeName}
          className="add-item"
        />
        <button type="submit" className="add-button">
          <FaPlus className="plus" />
        </button>
      </form>

      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <Todo todo={todo} dispatch={dispatch} />
            </li>
          );
        })}
      </ul>

      {todos.length == 0 ? null : (
        <div className="clear-button">
          <p>You have {todos.length} pending tasks</p>
          <button onClick={() => dispatch({ type: ACTIONS.CLEAR_ALL })}>
            Clear All
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
