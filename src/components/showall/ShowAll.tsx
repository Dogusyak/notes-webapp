import React, { FC } from "react";
import "./ShowAll.css";

interface Props {
  showAll: (isCheck: boolean) => void;
}

let checkBoxChecked: boolean = true;

const ShowAllTodo: FC<Props> = ({ showAll }) => {
  const showAllRecords = (): void => {
    if (checkBoxChecked) {
      showAll(false);
      checkBoxChecked = false;
    }
    else {
      showAll(true);
      checkBoxChecked = true;
    }
  };

  return (
    <div>
      <input type="checkbox" checked={checkBoxChecked} onChange={showAllRecords} /><span>Show All</span>
    </div>
  );

};

export default ShowAllTodo;