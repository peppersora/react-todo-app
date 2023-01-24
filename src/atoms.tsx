import { atom, selector } from "recoil";

export interface IToDo{
    text:string;
    id: number;
    category: "TO_DO" | "DOING" | "DONE";
    //  이 세개중에 한개를 사용해야한다.
}

export const categoryState = atom({
    key:"category",
    default:"TO_DO",
});


export const toDoState = atom<IToDo[]>({
    // atom은 key, default가 항상 필요
    key: "toDO",
    default:[],
});

// selector를 이용해서 state를 변화시킬 수 있다.
// state자체를 바꾸는것이 아니라 그 output을 바꾸고 있다.
// selector는 세개의 배열을 담은 하나의 배열을 return하고 있다.
export const toDoSelector = selector({
    key:"toDoSelector",
    get:({ get }) =>{
        const toDos = get(toDoState);
        const category = get(categoryState);
        return toDos.filter((toDo) => toDo.category === category);
    },
});