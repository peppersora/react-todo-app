import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
    key:"recoil-persist",
    storage: localStorage,
});


// enumerable의 약자로 열거가능한 이라는뜻
// protectable하게 만들기 위해서 각각의 string들을
// enum은 기본적으로 숫자다. 
//  그래서 실제로는 0,1,2 순이다.
export enum Categories{
    "TO_DO" ,
     "DOING",
     "DONE",
}

export interface IToDo{
    text:string;
    id: number;
    category: Categories;
    //  이 세개중에 한개를 사용해야한다.
}

export const categoryState = atom<Categories>({
    key:"category",
    default:Categories.TO_DO,
});


export const toDoState = atom<IToDo[]>({
    // atom은 key, default가 항상 필요
    key: "toDO",
    default:[],
    // localstrage를 위해 추가
    effects_UNSTABLE: [persistAtom],
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

