import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";

const Wrapper = styled.div`
  display: flex;
  max-width: 480px;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(1,1fr);
  /* 3개의 board를 만들것이기 때문에 */

`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
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
      <Boards>
      <Droppable droppableId={boardId}>
        {(magic) =>
        <div ref={magic.innerRef} 
        {...magic.droppableProps}>
          {toDos.map((toDo,index) => (
            <DraggableCard key={toDo}
             toDo={toDo} 
             index={index}/>
          ))}
          {magic.placeholder}
          {/* placeholder는 드래그시
          board의 사이즈가 변하지 않도록해준다. */}
          </div>
        }
      </Droppable>
      </Boards>
    </Wrapper>
    );
}
export default Board;