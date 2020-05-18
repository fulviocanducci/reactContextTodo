import React, { createContext, useContext, useState, useEffect } from "react";

const IndexContext = createContext();

export const IndexContextProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const handleAddTodo = (todo) => {
    setTodos([...todos, todo]);
  };
  const handleRemoveTodo = (todo) => {
    setTodos(todos.filter((x) => x.id !== todo.id));
  };
  const handleDoneTodo = (todo) => {
    setTodos(
      todos.map((x) => {
        if (x.id === todo.id) {
          return { ...x, done: true };
        }
        return x;
      })
    );
  };
  useEffect(() => {
    const _todos = window.localStorage.getItem("@todos");
    if (_todos) setTodos(JSON.parse(_todos));
  }, []);
  useEffect(() => {
    const saveLocalStorage = () => {
      window.localStorage.setItem("@todos", JSON.stringify(todos));
    };
    saveLocalStorage();
  }, [todos]);
  return (
    <IndexContext.Provider
      value={{ todos, handleAddTodo, handleRemoveTodo, handleDoneTodo }}
    >
      {children}
    </IndexContext.Provider>
  );
};

export const useTodos = () => {
  const { todos, handleAddTodo, handleRemoveTodo, handleDoneTodo } = useContext(
    IndexContext
  );
  return { todos, handleAddTodo, handleRemoveTodo, handleDoneTodo };
};
