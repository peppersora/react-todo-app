import React from "react";
import { useSetRecoilState } from "recoil";
import { Categories, IToDo,toDoState } from "../atoms";

function ToDo({text,category,id}:IToDo){
    const setToDos = useSetRecoilState(toDoState);
    const deleteToDos = () => {
        setToDos((oldToDos) => {
            const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
            return[
                ...oldToDos.slice(0,targetIndex),
                ...oldToDos.slice(targetIndex+1),
            ];
        });
    };

    const onClick = (event:React.MouseEvent<HTMLButtonElement>) =>
    {
         
        
        const {
            currentTarget:{name},
        }
        = event;
        setToDos((oldToDos) => {
            const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
            // console.log(targetIndex);
            // const oldToDos = oldToDos[targetIndex];
            const newToDos = {text, id, category: name as any};
            // as any라고 적음으로써 타입스크립트에게 체크하지 말라함
            return [...oldToDos.slice(0,targetIndex),
            newToDos,
            ...oldToDos.slice(targetIndex+1)
        ];
        });
    };
        return (  
        <li>
        <span>{text}</span> 

        {category !== Categories.DOING && (
        <button name={Categories.DOING+""} onClick={onClick}>
          Doing
        </button>
      )}
            
        {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO+""}  onClick={onClick}>
            To Do
        </button>
        )}

        {category !== Categories.DONE &&(
             <button name={Categories.DONE+""} onClick={onClick}>
                Done
             </button>
             )}
             
             <button onClick={deleteToDos}>
                Delete
             </button>
        </li>
    );
}

export default ToDo;

