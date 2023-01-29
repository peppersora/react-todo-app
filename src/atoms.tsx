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
// * 보드안에서 이동시
// 1. 수정이 일어난 property만 복사한다.
// 2. 그리고 그 복사본을 기존 default옆에 붙여준다.
// 3. 복사본+ 복사본제외 원본

// * 보드간의 이동시
// 1. source에서 todo를 복사해서 가져오고 이동시킬 요소를 지운다.
// 2. "To Do" : ["a"]
//3. 가져온요소를  나머지 복사본에 붙여넣기해준다 
