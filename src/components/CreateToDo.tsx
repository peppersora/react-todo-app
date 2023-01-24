import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atoms";


interface IForm {
    toDo: string;
}  

function CreateToDo(){
    // component를 가져올때 다시 사용하는것이아니라
    // 수정할수 있도록만 해주면됨.
    const setToDos = useSetRecoilState(toDoState);
    const {register,handleSubmit} = useForm<IForm>();
    const handleValid = ({toDo}:IForm) =>{
        // console.log("add to do",data.toDo);
        setToDos((prev) =>[
            {
            text: toDo,
            id:Date.now(),
            category:"TO_DO"
        } ,
        ...prev,
    ]);
        //  prev을 받아서 prev배열 자체가 아닌
        //  prev안의 요소들을 return 할것이기때문에 '...'를 붙여준다.
        // setValue("toDo","");
        // console.log(toDos);
    };
    return(
        <form onSubmit=
        {handleSubmit(handleValid)}>
           <input
           {...register("toDo",{
               required: "please write a To Do",
           })}
           placeholder="Write a to do"
           />
       
           <button>Add</button>

      </form>
    );
}
export default CreateToDo;