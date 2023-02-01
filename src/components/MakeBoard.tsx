import { KeyboardEventHandler, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { BoardState, IBoard, ITodo, toDoState } from "../atoms";


const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  input {
    width: 50%;
  }
`;


interface categoryForm{
  category: string;
}

// button을 클릭하면 board가 생성됨
function MakeBoard () {
    const [open, setOpen] = useState(false);
    const [todos, setTodos] = useRecoilState(toDoState)
    const {register, setValue, handleSubmit,setFocus} = 
    useForm<categoryForm>({
      mode: "onBlur",
      defaultValues: { category: '' },

    });
    
    const onClicked = () => {
      setFocus("category");
      if(!open){
        setOpen(true);
      }else{
        setOpen(false);
      }
    };
    
    const onkeyPress:KeyboardEventHandler<HTMLInputElement> = (event) => {
      if(event.key === 'Escape'){
          setOpen(false);
          setValue("category","");
      }
    };

    const onVaild:SubmitHandler<categoryForm> = ({category}) => {
      if (category !== '') {
        if (
            Object.keys(todos).some(
                (v) => v.toLowerCase() === category.toLowerCase(),
            )
        )
            return;
        setTodos({ ...todos, [category]: [] }   );
        setValue('category', '');
    }
    setOpen(false);
};
    

    return(
      <Form
        onSubmit={handleSubmit(onVaild)}>
        <input
        {...register("category",{required:true})}
        type="text"
        placeholder="Write BoardName here and press Enter to create"
        onKeyDown={onkeyPress}
      />
      </Form>
    );
    }
export default MakeBoard;