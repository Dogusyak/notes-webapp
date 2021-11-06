import React, { FC } from "react";
import { ITask } from "../../models/ITask";
import StarRating from "../starrating/StarRating";

import "./TodoList.css";

interface Props {
  todo: ITask;
  key: number;
  completeTodo(id: number): void;
  undoCompleteTodo(id:number):void;
  deleteTodo: (id: number) => void;
}

const TodoList: FC<Props> = ({ todo, key, completeTodo, undoCompleteTodo, deleteTodo }) => {
  const todoComplete = (): void => {
    if (!todo.finished) {
      completeTodo(todo.id);
    }
    else
    {
      undoCompleteTodo(todo.id);
    }
  };

  const todoDelete = (): void => {
    deleteTodo(todo.id);
  };

  return (
    <div key={key} className="todolist">  
      <input type="checkbox" id="finished" onChange={todoComplete}></input>
      <label> <StarRating/></label>
      <h1
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
        <button name="delete" type="button" onClick={todoDelete}>
          Delete
        </button>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default TodoList;