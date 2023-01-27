// https://github.com/peppersora/react-todo-app.git
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import DraggableCard from "./components/DraggableCard";

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

const toDos = ["a","b","c","d","e","f"];

function App() {
  // atom의 값 뿐만아니라 수정하는 값까지 가지고 오기위해 state를 사용
  const [toDos, setToDos] = useRecoilState(toDoState);
  // onDragEnd Fn은 드래그가 끝났을때 실행되는 함수
  const onDragEnd = ({draggableId,destination,source}:DropResult) => {
    // 마우스 우클릭 go to defination으로 가면 확인해볼수 있다. =>index.d.ts
    // 이제 우리는 새로 수정된 array를 return해주어야한다.
    if(!destination)return;
    setToDos((oldToDos) => {
      // 우선은 oldToDos의 index를 복사해서 담아주는 변수를 만들었다.
      const copyToDos = [...oldToDos];
      // 1) Delete item on source.index
      copyToDos.splice(source.index,1);
      // 2) put back the item on the destination.index
      // 유저가 같은자리에 drag&drop할수도 있기때문에 destination이 
      //없을 수도 있다 그래서 앞에 물음표가 붙는다.
      copyToDos.splice(destination?.index,0,draggableId); 
      
      return copyToDos;
    })
  }
  // const onDragEnd = (args:any) =>{
  //   console.log(args); =>이렇게하면 onDragEnd Fn이 실행될때
  // 어떤 event가 일어나는지 알 수 있다.
  // };
  return (
  <DragDropContext onDragEnd={onDragEnd}>
    <Wrapper>
      <Boards>
      <Droppable droppableId="one">
        {(magic) =>
        <Board ref={magic.innerRef} 
        {...magic.droppableProps}>
          {toDos.map((toDo,index) => (
            <DraggableCard key={toDo} toDo={toDo} index={index}/>
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
