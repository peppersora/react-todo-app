// https://github.com/peppersora/react-todo-app.git
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

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

const Board = styled.div`
  padding: 20px 10px;
  padding-top: 30px;
  background-color: ${(props )=> props.theme.boardColor};
  border-radius: 5px;
  min-height: 200px;
`;


const Card = styled.div`
  background-color: ${(props) => props.theme.cardColor};
  border-radius: 5px;
  padding: 10px 10px;
  margin-bottom: 5px;
`;

const toDos = ["a","b","c","d","e","f"];


function App() {
 
  const onDragEnd = () =>{};
  return (
  <DragDropContext onDragEnd={onDragEnd}>
    <Wrapper>
      <Boards>
      <Droppable droppableId="one">
        {(magic) =>
        <Board ref={magic.innerRef} 
        {...magic.droppableProps}>
          {toDos.map((toDo,index) => (
          <Draggable draggableId={toDo} index={index}>
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
          ))}
          {magic.placeholder}
          {/* placeholder는 드래그시
          board의 사이즈가 변하지 않도록해준다. */}
          </Board>
        }
      </Droppable>
      </Boards>
    </Wrapper>
  </DragDropContext>
  );
}

export default App;
