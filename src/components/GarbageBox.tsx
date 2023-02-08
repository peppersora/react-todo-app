import {  Droppable } from "react-beautiful-dnd";
import { BsTrash }  from "react-icons/bs"
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { garbageBox } from "../localstorage/atoms";

const GarbageWrapper = styled.div`
position: absolute;
  bottom: 25px;
  right: 25px;
  width: 50px;
  height: 40px;

  .garbage {
    background-color: none;
    width: 100%;
    height: 100%;
    display: inline-block;
    margin: 0 auto;

    svg {
      position: absolute;
      top: 13px;
      right: 8px;
      color: black;
    }
  }
`;




function GarbageBox () {
    const garbagebox = useRecoilValue(garbageBox);
    return(
        <Droppable droppableId="garbagebox">
            {(magic) =>(
                <GarbageWrapper ref={magic.innerRef}
                {...magic.droppableProps}>
                    <span className="garbage">
                        <span></span>
                  <BsTrash/>
                    </span>
                
                </GarbageWrapper>
            )}
        </Droppable>
    );
}
export default GarbageBox;
