import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
// string이 아닌 object인 todo를 만들기 위해 type을 먼저 정하자

// localstorage를 위해 recoilpersist사용
const { persistAtom } =recoilPersist({
  key:"recoil-persist",
  storage: localStorage,
});


export interface ITodo {
  id:number;
  // 인터페이스 ITodo의( name이 id이고, value가 number) => property!
  text:string;
}


 interface IToDoState {
    [key: string]: ITodo[];
  }
  

// card를 드래그했을때 제자리로 가지 않게 하기 위해 recoil 사용
export const toDoState = atom<IToDoState>({
    key:"toDo",
    default: {   
        "To Do": [],
        Doing: [],
        Done: [],
      },
      // localstorage를 위해 적용한 속성
      effects_UNSTABLE: [persistAtom],
});

// ===============  board =================

export interface IBoard {
  boardId:string;
  toDoId:[];
  // input이니까...
}

interface IBoardState{
  [key:string] : IBoard[];
}

export const BoardState = atom<IBoardState>({
  key:"boardId",
  default:{
    "boardIds":[],
    },
    // localstorage를 위해 적용한 속성
    effects_UNSTABLE: [persistAtom],
});

// ====== garbage==========
export const garbageBox = atom<boolean>({
  key:"garbage",
  default: false,
});

