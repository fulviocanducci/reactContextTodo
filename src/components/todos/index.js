import React, { useState } from "react";

import { useTodos } from "../../context";
import { createGuid } from "../../utils";

import waitImage from "../../wait.png";
import OkImage from "../../ok.png";

const TodoItem = ({ todo, index }) => {
  const { handleRemoveTodo, handleDoneTodo } = useTodos();
  return (
    <tr class="row">
      <td className="col-xs-1 col-sm-1 col-md-1 col-lg-1 align-middle">
        {todo.done ? (
          <img src={OkImage} alt="Done" title="Done" />
        ) : (
          <img src={waitImage} alt="Wait" title="Wait" />
        )}
      </td>
      <td className="col-xs-7 col-sm-7 col-md-7 col-lg-7 align-middle">
        {todo.title}
        <p>
          <small>
            <em>{todo.id}</em>
          </small>
        </p>
      </td>
      <td className="col-xs-2 col-sm-2 col-md-2 col-lg-2 align-middle">
        {!todo.done && (
          <button
            className="btn btn-info mr-2"
            onClick={(e) => handleDoneTodo(todo)}
          >
            Done
          </button>
        )}
      </td>
      <td className="col-xs-2 col-sm-2 col-md-2 col-lg-2 align-middle">
        <button
          className="btn btn-danger"
          onClick={(e) => handleRemoveTodo(todo)}
        >
          Remover
        </button>
      </td>
    </tr>
  );
};

const TodoItemLength = ({ count }) => (
  <div className="card mt-3 mb-3">
    <div className="card-body">Count: {count}</div>
  </div>
);

const TodoItems = ({ todos }) => (
  <div className="table-responsive-sm">
    <table className="table table-hover mt-3">
      <tbody>
        {todos.map((todo, i) => (
          <TodoItem key={i} todo={todo} index={i} />
        ))}
      </tbody>
    </table>
  </div>
);

const TodoAddItem = () => {
  const [title, setTitle] = useState("");
  const { handleAddTodo } = useTodos();
  const onSubmitForm = (e) => {
    e.preventDefault();
    const id = createGuid();
    const done = false;
    handleAddTodo({ id, title, done });
    setTitle("");
  };
  return (
    <form onSubmit={onSubmitForm}>
      <div className="form-row">
        <div className="form-group mb-2 col-8">
          <input
            id="inputTitle"
            className="form-control form-control-sm"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoCapitalize="off"
            placeholder="Title ..."
            autoFocus={true}
            autoComplete="off"
          />
        </div>
        <div className="form-group mb-2 col-4">
          <button type="submit" className="btn btn-success btn-sm btn-block">
            Add
          </button>
        </div>
      </div>
    </form>
  );
};

const TodoItemDefault = () => {
  const { todos } = useTodos();
  const sortTodos = (a, b) => a.done - b.done;
  return (
    <>
      <TodoItemLength count={todos.length} />
      <TodoAddItem />
      <TodoItems todos={todos.sort(sortTodos)} />
    </>
  );
};

export default TodoItemDefault;
