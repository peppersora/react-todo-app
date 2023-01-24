import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

// function ToDoList(){
//     const [todo, setTodo] = useState("");
//     const [todoError,setTodoError] = useState("");
//     const onChange = (event:React.FormEvent<HTMLInputElement>) => {
//         const {
//             currentTarget:{value},
//         }  = event;
//         setTodo(value);
//         setTodoError("");
//     }
//     const onSubmit = (event:React.FormEvent<HTMLFormElement>) =>{
//         event.preventDefault();
//         console.log(todo);
//         if(todo.length<10){
//            return setTodoError("To do should be longer");
//         }else{
//             console.log("submit");
//         }
//     };

//     return(
//        <div>
//         <form onSubmit={onSubmit}>
//             <input onChange={onChange} value={todo} placeholder="Write a to do"/>
//             <button>Add</button>
//             {todoError !== "" ? todoError :null}
//         </form>
//        </div>
//     )
// };

// 필수항목이 아닌것에는 '?' 붙여주기
interface IUseForm{
errors:{
    email?:{ 
        message:string;
    },
},
Email:string;
FirstName:string;
LastName:string;
UserName:string;
Password:string;
Password1:string;
extraError?:string;
}

const messageSpan = styled.span`
color: red;
`;


function ToDoList(){
    const {register,
        handleSubmit,
        formState:{errors},
        setError,
        // setError는 특정한 에러를 발생시키게해준다.
    } = useForm<IUseForm>({
        defaultValues:{
            Email:"@naver.com",
        }
    });
    // watch는 form의 입력값들의 변화를 관찰 할 수 있게해주는함수
    const onValid = (data:IUseForm) =>{
        if(data.Password !== data.Password1){
            setError("Password1",
            {message:"Password are not the same"},
            {shouldFocus:true}
            )
        }
        setError("extraError",{message:"Server offLine."});
        // 특정항목이 아닌 전체 form에 해당되는 에러
    };
    console.log(errors);
    // onValid함수는 모든 validation을 다 마쳤을때만 호출된다.

    return(
        <div>
                 <form 
                 style={{display:"flex",flexDirection:"column"}}
                 onSubmit={handleSubmit(onValid,)}>

                    <input {...register("Email",{
                        required: "Email is reqired",
                        pattern:{
                            value:/^[A-Za-z0-9._%+-]+@naver.com$/,
                            message: "Only naver.com emails allowed",
                            },
                        
                        // 정규식 표현법을 이용해서 사용 가능
                    })} 
                    placeholder="Email"/>
                        <span style={{
                            color:"red",
                        }}>
                    {errors.Email?.message}
                        </span>

                    <input {...register("FirstName" ,{
                        required: "FirstName is required",
                        validate: (value) => !value.includes("nico") || "error message"
                    })} 
                    placeholder="First Name"/>
                     <span>
                    {errors.FirstName?.message}
                    </span>

                    <input {...register("LastName",{
                        required: "LastName is required"
                    })} 
                    placeholder="Last Name"/>
                     <span>
                    {errors.LastName?.message}
                    </span> 

                    <input {...register("UserName",{
                        required:"UserName is required",minLength:10})} 
                    placeholder="UserName"/>
                    <span>
                    {errors.UserName?.message}
                    </span> 
                    
                    <input {...register("Password",{
                        required: "write here",  minLength:5
                       
                        })} 
                    placeholder="Password"/>
                    <span>
                    {errors.Password?.message}
                    </span> 
                    
                    <input {...register("Password1",{
                        required: "Password is required", 
                        minLength:{
                            value:5,
                            message: "Your password is too short.",
                        },
                    })} 
                    placeholder="Password1"/>
                    <span>
                    {errors.Password1?.message}
                    </span> 

                    <button>Add</button>

                    <span>
                    {errors?.extraError?.message}
                    </span> 
               </form>
                </div>
    );
}


export default ToDoList;