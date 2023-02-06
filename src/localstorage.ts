import { IToDos } from "./atoms"

export const Local_ToDo = "recoil_todos";

export const loadTodos = () => {
    const localTodos = localStorage.getItem(Local_ToDo);
    if(localTodos){
        return JSON.parse(localTodos);
    }
    return null;
};

export const SaveTodos = (todos:IToDos) => {
    localStorage.setItem(Local_ToDo,JSON.stringify(todos));
}