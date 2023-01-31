// 현재시간 불러오기

import { useState } from "react";
import styled from "styled-components";


const TimeControl = styled.div`
    display: flex;
    flex-direction: column;
    column-gap: 20px;
    justify-content: center;
    align-items: center;   
    font-weight: 800;
    color: black;

    .timer{
        margin-top: 10px;
    }
    `;
// 오늘 날짜
const date = new Date();
const year = date.getFullYear();
const month = date.getMonth()+1;
const today = date.getDate();
const setDay = (`${year} - ${month} - ${today}`);


function Clock() {
    const [timer, setTimer] = useState("00:00:00");
    const currentTime = () => {
        const date = new Date();
        const hours =String(date.getHours()).padStart(2,"0");
        const minutes = String(date.getMinutes()).padStart(2,"0");
        const seconds = String(date.getSeconds()).padStart(2,"0");
        setTimer(`${hours} : ${minutes} : ${seconds}`);
    };

    const startTimer = () => {
        setInterval(currentTime,1000);
    };
    startTimer();

 return (
    <div>
   
     <TimeControl>
         <div className="day">
            {setDay}
         </div>
             <div className="timer">
                {timer}
                </div>
         </TimeControl>
            </div>

 );
}
export default Clock;



