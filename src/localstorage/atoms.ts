import { atom } from "recoil";
import { loadTodos } from "./localstorage";
import { lightTheme } from "../styles/theme";
// string이 아닌 object인 todo를 만들기 위해 type을 먼저 정하자

// localstorage를 위해 recoilpersist사용
// const { persistAtom } = recoilPersist({
//   key:"recoil-persist",
//   storage: localStorage,
// });

export const ColorState = atom<"dark" | "light">({
  key: "ColorState",
  default: "light",
});

export interface ITodo {
 
  id: number;
  name: string;
  createdAt: Date;

}


 export interface IToDos {
    [key: string]: ITodo[];
  }
  

// card를 드래그했을때 제자리로 가지 않게 하기 위해 recoil 사용
export const defaultTodos: IToDos = {
      Todos:[],
      Doing: [],
      Done: [],
      // localstorage를 위해 적용한 속성
      // effects_UNSTABLE: [persistAtom],
};

export const todostate = atom<IToDos>({
  key: "todostate",
  default: loadTodos() ?? defaultTodos,
});

export let latestId = {
  id: 0,
};

// ====== garbage==========
export const garbageBox = atom<boolean>({
  key:"garbage",
  default: false,
});

