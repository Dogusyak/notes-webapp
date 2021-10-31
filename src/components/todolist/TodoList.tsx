import React, { FC, MouseEventHandler } from "react";
import { ITask } from "../../models/ITask";

import "./TodoList.css";

interface Props {
  todo: ITask;
  key: number;
  completeTodo(id: number): void;
  deleteTodo: (id: number) => void;
}

const TodoList: FC<Props> = ({ todo, key, completeTodo, deleteTodo }) => {
  const todoComplete = (): void => {
    if (!todo.finished) {
      completeTodo(todo.id);
    }
  };

  const todoDelete = (): void => {
    deleteTodo(todo.id);
  };

  return (
    <div key={key} className="todo">
      <h1
        onClick={todoComplete}
        style={
          todo.finished ? { pointerEvents: "none" } : { cursor: "pointer" }
        }
      >
        {todo.finished ? (
          <span style={{ textDecorationLine: "line-through" }}>
            {todo.content}
          </span>
        ) : (
          todo.content
        )}
      </h1>
      {todo.finished ? (
        <button type="button" onClick={todoDelete}>
          Delete
        </button>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default TodoList;