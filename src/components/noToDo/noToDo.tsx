
interface Props {
  lenghtOfArray :number;
  }
   
export const NoToDo = (props: Props) => {
  const returnValue:string=(props.lenghtOfArray === 0 ? "No Todo's" : "A lot Todo");
    return(
      <div > {returnValue}  </div>
    )
}

     



