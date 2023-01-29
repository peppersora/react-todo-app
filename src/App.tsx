// https://github.com/peppersora/react-todo-app.git
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import Board from "./components/Board";


const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;


const Boards = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 10px;

`;

function App() {
  // atom의 값 뿐만아니라 수정하는 값까지 가지고 오기위해 state를 사용
  const [toDos, setToDos] = useRecoilState(toDoState);
  // onDragEnd Fn은 드래그가 끝났을때 실행되는 함수
  const onDragEnd = (info:DropResult) =>  {
    console.log(info); 
    const { destination, draggableId, source } = info;
    if (!destination) return;
    if (destination?.droppableId === source.droppableId) {
      // 같은 보드에서만 움직였 다.
      setToDos((allBoards) => {
        const boardCopy = [...allBoards[source.droppableId]];
        boardCopy.splice(source.index, 1);
        boardCopy.splice(destination?.index, 0, draggableId);
        // allBoards는 array이기때문에...
        return {
          ...allBoards,
          [source.droppableId]: boardCopy,
        };
      });
    }
    if(destination?.droppableId !== source.droppableId){
      // board간의 이동을 하겠다.
      // modifier함수(setToDos)를 사용하는 방법 1. value자체를 가져와서 사용
      //2. 새로운 state를 만들어서 return 해줄 수 있다.
      setToDos((allBoards) => {
        const sourceBoard = [...allBoards[source.droppableId]];
        const destinationBoard = [...allBoards[destination?.droppableId]];
        // 가져오는것은 다했으니 이제 삭제하기
        sourceBoard.splice(source.index,1);
        // sourceBoard에서 index를 한개만 삭제할것이다
        destinationBoard.splice(destination?.index,0,draggableId);
        // 가져온 draggableId를 움직임이 끝나는 board의 index에 넣어줬다.
        return{
          ...allBoards,
          [source.droppableId]:sourceBoard,
          [destination?.droppableId] : destinationBoard ,
        }

      });
    }
  };
 
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(toDos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={toDos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
