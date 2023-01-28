import { atom } from "recoil";

interface IToDoState {
    [key: string]: string[];
  }
  

// card를 드래그했을때 제자리로 가지 않게 하기 위해 recoil 사용
export const toDoState = atom<IToDoState>({
    key:"toDo",
    default: {
        "To Do": ["a", "b"],
        Doing: ["c", "d", "e"],
        Done: ["f"],
      },
});