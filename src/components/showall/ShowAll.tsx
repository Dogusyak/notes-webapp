import React, { FC } from "react";
import { ITask } from "../../models/ITask";
import "./ShowAll.css";

interface Props {
  showAll: (isCheck:boolean) => boolean;
}

let checkBoxChecked:boolean = false;

const ShowAllTodo:FC<Props>=({showAll})=>{
    const showAllRecords = (): void => {
      checkBoxChecked = showAll(checkBoxChecked);
    };
    return (
      <div>
          <input type="checkbox" checked={checkBoxChecked} onChange={showAllRecords}/><span>Show All</span>
          </div>
      );
  
};
    export default ShowAllTodo;