import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { ITodo,  } from "../atoms";


const Card = styled.div<{isDragging:boolean}>`
  background-color: ${(props) => props.isDragging ? "#74b9ff" :
   props.theme.cardColor};
  border-radius: 5px;
  padding: 25px 25px;
  margin-bottom: 5px;
  justify-content: center;
  box-shadow: ${(props) => 
  props.isDragging ? "0px 2px 10px rgba(0,0,0,0.5)" : "none"};
 
`;

interface IDraggableCardProps {
  toDoId: string;
  index: number;
  todo: ITodo;
}

export function DraggableCard
({toDoId,index,todo}:IDraggableCardProps){
    return(
<Draggable
// react.js에서 key는 숫자였지만
// key는 draggableId와 무조건 같아야한다.
draggableId={toDoId+""} 
index={index}
>
 {(magic,snapshot) =>(
   <Card 
   isDragging={snapshot.isDragging}
   ref={magic.innerRef} 
   {...magic.dragHandleProps}
    {...magic.draggableProps}
    {...magic.draggableProps}
   >
    {todo.name}
    </Card>
    )}
</Draggable>

    );
}
export default React.memo(DraggableCard);
