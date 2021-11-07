import React, { FC, useState } from "react";
import { ITask } from "../../models/ITask";

import TodoForm from "../../components/todoform/TodoForm";

import "./AppContent.css";
import TodoList from "../../components/todolist/TodoList";

export const AppContent: FC = () => {
  const [todoList, setTodoList] = useState<ITask[]>([
    {
      id: 1,
      content: "Car wash",
      importance:0,
      finished: false,
    },
    {
        id: 2,
        content: "Windows cleaning",
        importance:1,
        finished: true,
    },
  ]);

  const addTodo = (todo: string): void => {
    if (!todo) {
      alert("please add todo!");
      return;
    }
    const data: ITask = {
      id: todoList.length < 1 ? 1 : todoList[todoList.length - 1].id + 1,
      importance:0,
      content: todo,
      finished: false,
    };
    setTodoList([...todoList, data]);
  };

  const completeTodo = (id: number): void => {
    setTodoList(
      todoList.map(
        (todo: ITask): ITask =>
          todo.id === id
            ? Object.assign(todo, { finished: true }) && todo
            : todo
      )
    );
  };

  const undoCompleteTodo = (id: number): void => {
    setTodoList(
      todoList.map(
        (todo: ITask): ITask =>
          todo.id === id
            ? Object.assign(todo, { finished: false }) && todo
            : todo
      )
    );
  };

  const setChecked = (id: number): boolean => {
    var value = (todoList).find(x => x.id === id);
      if(value?.finished)
      {
      return true as boolean;
      }
      else
      {
        return false as boolean;
      }
  };

  const deleteTodo = (id: number): void => {
    setTodoList(
      todoList.filter((todo: ITask): ITask | null =>
        todo.id !== id ? todo : null
      )
    );
  };

  return (
    <div className="app">
      <div className="container">
        <TodoForm addTodo={addTodo} />
        <div className="todoList">
          {todoList.map((todo: ITask, key: number) => (
            <TodoList
              key={key}
              todo={todo}
              setChecked={setChecked}
              completeTodo={completeTodo}
              undoCompleteTodo={undoCompleteTodo}
              deleteTodo={deleteTodo}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppContent;