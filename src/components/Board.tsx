import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.div`

  width: 300px;
  padding-top: 10px;
  
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;


const Title = styled.div`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  margin-top: 10px;
  font-size: 18px;
  align-items: center;
`;

interface IAreaProps{
  isDraggingOver:boolean;
  draggingFromThisWith: boolean;
}

const Area = styled.div<IAreaProps>`
  background-color:${(props) => props.isDraggingOver ? "#dfe6e9" : 
  props.draggingFromThisWith ? "#b2bec3" : "transparent"};
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
  padding: 20px;
`;


 interface IBoardProps {
    toDos: string[];
    boardId: string;
 }


function Board({toDos,boardId}: 
    IBoardProps){
    return(
        <Wrapper>
            <Title>{boardId}</Title>
      <Droppable droppableId={boardId}>
        {(magic,info) =>
        <Area isDraggingOver={info.isDraggingOver}  
        draggingFromThisWith={Boolean(info.draggingFromThisWith)}
        ref={magic.innerRef} 
        {...magic.droppableProps}>
          {toDos.map((toDo,index) => (
            <DraggableCard key={toDo}
             toDo={toDo} 
             index={index}/>
          ))}
          {magic.placeholder}
          {/* placeholder는 드래그시
          board의 사이즈가 변하지 않도록해준다. */}
          </Area>
        }
      </Droppable>     
    </Wrapper>
    );
}
export default Board;