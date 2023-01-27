import { atom, selector } from "recoil";

// card를 드래그했을때 제자리로 가지 않게 하기 위해 recoil 사용
export const toDoState = atom({
    key:"toDo",
    default: ["a","b","c","d","e","f"],
});