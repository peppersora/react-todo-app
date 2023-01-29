import { useRef } from "react";
import { Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";
import { ITodo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";

const Wrapper = styled.div`
  width: 300px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;

const Form = styled.form`
  width: 100%;
  input {
    width: 100%;
  }
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
    toDos:ITodo[];
    boardId: string;
 }

interface IForm {
  toDo:string;
 }

function Board({toDos,boardId}: IBoardProps){
      const setToDos = useSetRecoilState(toDoState);
      const {register, setValue, handleSubmit} = useForm<IForm>();
      const onValid = ({toDo}:IForm) => {
      const newToDo = {
        id: Date.now(),
        text: toDo,
      }
      setToDos( (allBoards) => {
        return{
          ...allBoards,
          [boardId] : [...allBoards[boardId], newToDo],
          // 복사본을 기준으로 새로운것을 만들어주고
          //  모든 기존의 board들을 가져다 넣어줬음
        }
      });
        setValue("toDo","");
      }
    return(
        <Wrapper>
            <Title>{boardId}</Title>
           <Form onSubmit={handleSubmit(onValid)}>
            <input {...register("toDo",{required:true})} 
            type="text" 
            placeholder={`Add task on ${boardId}`} />
           </Form>
      <Droppable droppableId={boardId}>
        {(magic,info) =>
        <Area isDraggingOver={info.isDraggingOver}  
        draggingFromThisWith={Boolean(info.draggingFromThisWith)}
        ref={magic.innerRef} 
        {...magic.droppableProps}>
          {toDos.map((toDo,index) => (
            <DraggableCard 
              key={toDo.id}
              index={index} 
              toDoId={toDo.id} 
              toDoText={toDo.text}/>
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