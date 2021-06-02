import { useEffect, useState } from "react";
import "./App.css";

const validSequence = [
  [1, 2, 3],
  [1, 5, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 5, 7],
  [3, 6, 9],
  [4, 5, 6],
  [7, 8, 9],
];

export default function App() {
  const [xList, setXList] = useState([]);
  const [oList, setOList] = useState([]);
  const [xTurn, setXTurn] = useState(true);
  const [winner, setWinner] = useState("");
  const [draw, setDraw] = useState(false);

  const onClickHandler = (id) => {
    if (xTurn) setXList((oldState) => [...oldState, id]);
    else setOList((oldState) => [...oldState, id]);

    setXTurn(!xTurn);
  };

  const determineValue = (id) => {
    if (xList.includes(id)) return "X";
    else if (oList.includes(id)) return "O";
    else return "";
  };

  useEffect(() => {
    if (xList.length >= 3) {
      for (let i = 0; i < validSequence.length; i++) {
        let [a, b, c] = validSequence[i];
        if (xList.includes(a) && xList.includes(b) && xList.includes(c)) {
          setWinner("X");
          break;
        } else if (
          oList.includes(a) &&
          oList.includes(b) &&
          oList.includes(c)
        ) {
          setWinner("O");
          break;
        } else if (xList.length + oList.length === 9) {
          setWinner("");
          setDraw(true);
        }
      }
    }
  }, [xList, oList]);

  const displayCell = (cellNumber) => {
    const value = determineValue(cellNumber);
    return (
      <button
        className="singleCell"
        onClick={() => onClickHandler(cellNumber)}
        disabled={value === "" ? false : true}
      >
        {value}
      </button>
    );
  };

  const handleReset = () => {
    setXList([]);
    setOList([]);
    setXTurn(true);
    setWinner("");
    setDraw(false);
  };

  return (
    <div className="App">
      {xTurn && <div className="turn-header">X's turn to play</div>}
      {!xTurn && <div className="turn-header">Y's turn to play</div>}
      <div className="outter-square">
        <div className="row">
          {displayCell(1)}
          {displayCell(2)}
          {displayCell(3)}
        </div>
        <div className="row">
          {displayCell(4)}
          {displayCell(5)}
          {displayCell(6)}
        </div>
        <div className="row">
          {displayCell(7)}
          {displayCell(8)}
          {displayCell(9)}
        </div>
      </div>
      {winner !== "" && <div className="result">{`Winner is ${winner}`}</div>}
      {draw && <div className="result">It's a draw.</div>}
      <button className="reset-button" onClick={() => handleReset()}>
        Reset
      </button>
    </div>
  );
}
