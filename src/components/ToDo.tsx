import { IToDo } from "../atoms";

function ToDo({text,category}:IToDo){
    const onClick = (newCategory:IToDo["category"]) =>{
        console.log("I wanna go",newCategory);
    };
    return (  
        <li>
        <span>{text}</span> 
        {category !== "DOING" &&(
             <button onClick={() => onClick("DOING")}>Doing</button>)}
             {/* 인자를 넘기기 위해 익명함수를 부른뒤 아래 같은 식으로 사용 
              <button onClick={() => onClick("DOING")()}>Doing</button>)}
             */}
        {category !== "TO_DO" && (
        <button onClick={() => onClick("TO_DO")}>To Do</button>)}
        {category !== "DONE" &&(
             <button onClick={() => onClick("DONE")}>Done</button>)}
        </li>
    );
}

export default ToDo;