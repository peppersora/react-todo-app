import {  Droppable } from "react-beautiful-dnd";
import { BsTrash }  from "react-icons/bs"
import styled from "styled-components";

const GarbageWrapper = styled.div`
position: absolute;
  bottom: 25px;
  right: 25px;
  width: 33px;
  height: 40px;

`;




function GarbageBox () {

    return(
        <Droppable droppableId="garbage">
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
