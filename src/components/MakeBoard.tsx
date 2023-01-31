import { useRecoilState } from "recoil";
import { BoardState } from "../atoms";

function MakeBoard () {
    const [board, setBoard] = useRecoilState(BoardState);

    return(
        <input
        
        type="text"
        placeholder="Write BoardName here and press Enter to create"
      />
    )
};
export default MakeBoard;