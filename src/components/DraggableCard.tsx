import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";


const Card = styled.div`
  background-color: ${(props) => props.theme.cardColor};
  border-radius: 5px;
  padding: 10px 10px;
  margin-bottom: 5px;
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
 {(magic) =>(
   <Card
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
