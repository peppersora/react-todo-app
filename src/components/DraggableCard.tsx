import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";


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
    toDo:string;
    index:number;
}

export function DraggableCard({toDo,index}:IDraggableCardProps){
    return(
<Draggable
key={toDo} 
// react.js에서 key는 숫자였지만
// key는 draggableId와 무조건 같아야한다.
draggableId={toDo} 
index={index}>
 {(magic,snapshot) =>(
   <Card 
   isDragging={snapshot.isDragging}
   ref={magic.innerRef} 
   {...magic.dragHandleProps}
    {...magic.draggableProps}
   >
    {toDo}
    </Card>
    )}
</Draggable>

    );
}
export default React.memo(DraggableCard);
