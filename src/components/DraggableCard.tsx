import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import { ITodo,  } from "../localstorage/atoms";
import clsx from 'clsx';

const Card = styled.div`
    width: 100%;
    background-color: ${(props) => props.theme.background.primary};
    padding: 10px;
    border-radius: 5px;

    &.dragging {
        background-color: tomato;
    }

    &:not(:last-child) {
        margin-bottom: 10px;
    }
`;


interface IDraggableCardProps {
  index: number;
  todo: ITodo;
  draggableId: string;
}

export function DraggableCard
({draggableId,index,todo}:IDraggableCardProps){
    return(
<Draggable
// react.js에서 key는 숫자였지만
// key는 draggableId와 무조건 같아야한다.
draggableId={draggableId+""} 
index={index}
>
{(p, { isDragging }) => (
                <Card
                    ref={p.innerRef}
                    {...p.draggableProps}
                    {...p.dragHandleProps}
                    className={clsx(isDragging && 'dragging')}
                >
                    {todo.name}
                </Card>
            )}
</Draggable>

    );
}
export default React.memo(DraggableCard);
