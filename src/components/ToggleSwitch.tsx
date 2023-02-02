import React from "react";
import styled from "styled-components";

const Container = styled.label`
position: relative;
display: inline-block;
width: 60px;
height: 30px;
`;


const Slider = styled.span`
position: absolute;
cursor: pointer;
top: 0;
left: 0;
right: 0;
bottom: 0;
background-color: #ccc;
-webkit-transition: .4s;
transition: .4s;

&::before {
    position: absolute;
    content: '';
    height: 24px;
    width: 24px;
    left: 3px;
    bottom: 3px;
    border-radius: 50%;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
}
`;

    const CheckBox = styled.input`
    opacity: 0;
      width: 0;
      height: 0;
      &:checked + ${Slider} {
            background-color: ${(props) => props.theme.boardColor};
        }

        &:checked + ${Slider}::before {
        -webkit-transform: translateX(28px);
        -ms-transform: translateX(28px);
        transform: translateX(28px);
    }
    `;

interface IToggleSwitch {
    Onchange: React.ChangeEventHandler<HTMLInputElement>;
    defaultChecked: boolean;
}


export const ToggleSwitch:React.FC<IToggleSwitch> = ({Onchange}) => {
    return(
        <Container>
            <CheckBox
                type="checkbox"
                onChange={Onchange}
                defaultChecked={true}
            />
            <Slider>             
            </Slider>
        </Container>

    );


}
