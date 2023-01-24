
import { useRecoilState, useRecoilValue} from "recoil";
import { toDoState } from "../atoms";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

function ToDoList(){
    // useRecoilValue는 값만 반환해주고, modifier함수는 반환하지 않는다.
    const toDos = useRecoilValue(toDoState);
    // const [toDos, setToDos] = useRecoilState(toDoState);
    // 위에 함수에서 setToDos는 이제 사용하시 않아서 필요없음
    // const [value, modFn] = useRecoilState(toDoState);
    // const value = useRecoilValue(toDoState);
    // value는 atom으로부터 불러온 값
    // const modFn = useRecoilState(toDoState);
    // atom의 값을 바꿀 수 있다. => 수정
  
    return(
        <div>
            <h1>To Dos</h1>
            <hr/>
                <CreateToDo/>
               <ul>
                {toDos.map((toDo) =>(
                <ToDo key={toDo.id}{...toDo}/>
                  
                ))}
               </ul>
                </div>
    );
}


export default ToDoList;