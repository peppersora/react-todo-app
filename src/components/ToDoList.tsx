import React from "react";
import { useRecoilState, useRecoilValue} from "recoil";
import { Categories, categoryState, toDoSelector } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList(){
   
    const toDos  = useRecoilValue(toDoSelector);
    // useRecoilValue는 atom과 selector의 값만 반환한다.
    const [category, setCategory] = useRecoilState(categoryState);
    // useRecoilState는 값과 더불어 modifier함수도 제공
    const onInput =(event:React.FormEvent<HTMLSelectElement>) => 
    { setCategory(event.currentTarget.value as any)};
    console.log(category);

    return(
        <div>
            <h1>To Dos</h1>
            <hr/>
            
            <select value={category} onInput={onInput}>
                <option value={Categories.TO_DO}>To Do</option>
                <option value={Categories.DOING}>Doing</option>
                <option value={Categories.DONE}>Done</option>
            </select>
            
                <CreateToDo/>        
                {toDos?.map((toDo) => (
                    <ToDo key={toDo.id} {...toDo}/>
                ))}    
                </div>
    );
}


export default ToDoList;