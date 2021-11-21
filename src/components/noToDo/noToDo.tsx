import "./noToDo.css";

interface Props {
  lenghtOfArray: number;
}

export const NoToDo = (props: Props) => {
  const returnValue: string = (props.lenghtOfArray === 0 ? "No Todo's" : "");
  return (
    <div className="noToDo" > {returnValue}  </div>
  )
}





