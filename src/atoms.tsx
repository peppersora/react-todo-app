import { atom } from "recoil";

export interface IToDo{
    text:string;
    id: number;
    category: "TO_DO" | "DOING" | "DONE";
    //  이 세개중에 한개를 사용해야한다.
}

export const toDoState = atom<IToDo[]>({
    // atom은 key, default가 항상 필요
    key: "toDO",
    default:[],
});
