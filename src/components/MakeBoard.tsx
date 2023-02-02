import { KeyboardEventHandler, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState} from "recoil";
import styled from "styled-components";
import {  toDoState } from "../atoms";



const ButtonContainer = styled.div`
width: 100%;
min-width: 300px;
max-width: 300px;
padding: 10px;
margin-top: 10px;
background-color: ${(props) => props.theme.boardColor};
border-radius: 5px;


button {
  background-color: ${(props) => props.theme.cardColor};
        color: black;
        font-weight: 600;
        outline: none;
        border-radius: 8px;
        width: 100%;
        padding: 5px;
        border: none;
        cursor: pointer;
        margin: 5px 0;
}
`;


const Form = styled.form`

  width: 100%;
  input {
    width: 100%;
    outline: none;
    border: 1px solid ${(props) => props.theme.cardColor};
    padding: 5px 10px;
    border-radius: 8px;
  }

  .hidden {
    display: none;
  }
  .visible {
    display: block;
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
    
    // category만들기
    const onkeyPress:KeyboardEventHandler<HTMLInputElement> = (event) => {
      if(event.key === "Escape"){
          setOpen(false);
          setValue("category","");
      }
    };
    // addcategory 되었을때
    const onVaild:SubmitHandler<categoryForm> = ({category}) => {
      // category가 생겼을때
      if (category !== "") {
        if (
            Object.keys(todos).some(
                (list) => list.toLowerCase() === category.toLowerCase(),
            )
        )
            return;

        setTodos({ ...todos, [category]: [] }   );
        setValue("category", "");
    }
    setOpen(false);
};
    

    return(
      <ButtonContainer>
      <Form
      className={open ? "visible" : "hidden"}
        onSubmit={handleSubmit(onVaild)}>
        <input
        {...register("category",{required:true})}
        type="text"
        placeholder="Write BoardName here and press Enter to create"
        onKeyDown={onkeyPress}
        />
      </Form>
     { !open && <button onClick={onClicked}>Add Category</button>}
        </ButtonContainer>
    );
    }
export default MakeBoard;