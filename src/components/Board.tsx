import { useEffect, useRef } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";
import DraggableCard from "./DraggableCard";
import { ITodo, IToDos, latestId, todostate } from "../atoms";
import { useRecoilState } from "recoil";
import { SaveTodos } from "../localstorage";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CardWrapper = styled.div`
    width: 100%;
    flex: 1;
    flex-grow: 1;
    flex-shrink: 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    padding: 10px;
    margin-bottom: 10px;
    background-color: ${(props) => props.theme.boardColor};
    border-radius: 8px;
    position: relative;
    transition: transform 0.3s ease-in-out;

    &.category-drag {
        transform: rotate(15deg);
    }

    h2 {
        font-size: 24px;
        font-weight: 500;
        text-align: center;
        background-color: inherit;
        /* color: ${(props) => props.theme.bgColor.link}; */
    }

    h4 {
        font-size: 16px;
        background-color: inherit;
        color: inherit;
        margin-bottom: 10px;
    }

    form {
        width: 100%;
        display: flex;
        flex-direction: column;
        background-color: inherit;
    }

    input[type='text'] {
        width: 100%;
        outline: none;
        border: 1px solid ${(props) => props.theme.boardColor};
        background-color: ${(props) => props.theme.bgColor};
        border-radius: 5px;
        padding: 5px 10px;
    }

    button {
        margin: 5px 0;
        outline: none;
        border: 1px solid ${(props) => props.theme.boardColor};
        border-radius: 5px;
        background-color: ${(props) => props.theme.bgColor};
        color: ${(props) => props.theme.cardColor};
        padding: 5px 0;
        cursor: pointer;
    }
`;

const CardArea = styled.div<IAreaProps>`
    display: flex;
    /* background-color: inherit; */
    flex-direction: column;
    background-color:${(props) => props.isDraggingOver ? "#dfe6e9" : 
    props.draggingFromThisWith ? "#b2bec3" : "transparent"};
    flex-grow: 1;
    transition: background-color 0.3s ease-in-out;
    &.dragging {
        background-color: red;
    }

    &.from-this {
        background-color: pink;
    }
`;

const TodoContainer = styled.div`
    width: 100%;
    max-width: 300px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;

    &:not(:last-child) {
        margin-right: 5px;
    }

    &.category-drag {
        background-color: transparent;
    }
`;

const DeleteButtonWrapper = styled.div`
    width: 20px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 10px;
    right: 10px;
    background-color: crimson;
    color: white;
    position: absolute;
    z-index: 99;
    border-radius: 50%;
    cursor: pointer;
    transition-property: background-color, color;
    transition: 0.3s ease-in-out;

    &:hover {
        color: crimson;
        background-color: white;
    }

    svg {
        background-color: inherit;
        color: inherit;

        path {
            color: inherit;
        }
    }
`;

interface IAreaProps{
  isDraggingOver:boolean;
  draggingFromThisWith: boolean;
}


interface Itodos{
  draggableId: string;
  index: number;
  IToDo:ITodo;
  
}

interface IForm {
  todo:string;
 
 }

 const droppableCard = 
 ({droppableId,index,IToDo}:Itodos) => {

   const {register, setValue, handleSubmit} = useForm<IForm>({
    mode:"onBlur",
   });
   const [todoState, setTodoState] = useRecoilState(todostate);

   const onDeleteBtn = () => {
    setTodoState((prev) => {
      const select = {...prev};
      delete select[droppableId];
      return{...select};
    });
   };
    
   const onValid: SubmitHandler<IForm> = (data) => {
    if (data.todo === '') return;
    setTodoState((prev) => {
        const newTodo = prev[droppableId] ? prev[droppableId].slice(0) : [];
        newTodo.splice(0, 0, {
            id: latestId.id,
            name: data.todo,
            createdAt: new Date(),
        });
        latestId.id += 1;
        return {
            ...prev,
            [droppableId]: newTodo,
        };
    });
    setValue('todo', '');
};

useEffect(() => {
  SaveTodos(todoState);
}, [todoState]);

return (
  <Draggable draggableId={`category-${droppableId}`} index={index}>
      {(p, s) => (
          <TodoContainer
              ref={p.innerRef}
              {...p.draggableProps}
              {...p.dragHandleProps}
              className={clsx(s.isDragging && 'category-drag')}
          >
              <CardWrapper
                  className={clsx(s.isDragging && 'category-drag')}
              >
                  <DeleteButtonWrapper onClick={onDeleteBtn}>
                      <FontAwesomeIcon
                          icon={faTrashAlt}
                          color={'white'}
                          size={'xs'}
                      />
                  </DeleteButtonWrapper>
                  {/* <h2>{title}</h2> */}
                  <Droppable droppableId={droppableId}>
                      {(p, { isDraggingOver, draggingFromThisWith }) => (
                          <div
                              {...p.droppableProps}
                              ref={p.innerRef}
                              style={{
                                  backgroundColor: 'inherit',
                                  color: 'inherit',
                                  display: 'flex',
                                  flexDirection: 'column',
                              }}
                          >
                              <h4>
                                  isDraggingOver:{' '}
                                  {isDraggingOver ? 'true' : 'false'}
                              </h4>
                              <h4>
                                  DraggingFromThisWith:{' '}
                                  {draggingFromThisWith}
                              </h4>
                              <form onSubmit={handleSubmit(onValid)}>
                                  <input
                                      type={'text'}
                                      {...register('todo')}
                                      placeholder={'What to do?'}
                                  />
                                  <button>Add</button>
                              </form>
                              <CardArea
                                  className={clsx(
                                      isDraggingOver && 'dragging',
                                      Boolean(draggingFromThisWith) &&
                                          'from-this',
                                  )}
                              >
                                  {IToDo.map((todo, index) => (
                                      <DraggableCard
                                          key={`${todo.name}-${todo.id}:${index}`}
                                          draggableId={`${todo.name}-${todo.id}:${index}`}
                                          index={index}
                                          todo={todo}
                                      />
                                  ))}
                                  {p.placeholder}
                              </CardArea>
                          </div>
                      )}
                  </Droppable>
              </CardWrapper>
          </TodoContainer>
      )}
  </Draggable>
);
  };
  // droppableCard


  export default React.memo(droppableCard);

