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

interface IBoard {
  id:number;
  text:string;
}


interface IBoardState{
  [key: string] : IBoard[];
}

export const BoardState = atom<IBoardState>({
  key:"board",
  default:{
    "boardId":[],
    },
    // localstorage를 위해 적용한 속성
    effects_UNSTABLE: [persistAtom],
});

export const garbageBox = atom<boolean>({
  key:"garbage",
  default: false,
});
// * 보드안에서 이동시
// 1. 수정이 일어난 property만 복사한다.
// 2. 그리고 그 복사본을 기존 default옆에 붙여준다.
// 3. 복사본+ 복사본제외 원본

// * 보드간의 이동시
// 1. source에서 todo를 복사해서 가져오고 이동시킬 요소를 지운다.
// 2. "To Do" : ["a"]
//3. 가져온요소를  나머지 복사본에 붙여넣기해준다 
