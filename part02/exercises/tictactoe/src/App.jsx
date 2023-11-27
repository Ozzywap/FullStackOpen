import { useState } from "react";

const Square = (props) => {
  return (
    <button
      style={props.style}
      onClick={props.onSquareClick}
      className="square"
    >
      {props.value}
    </button>
  );
};

const Board = ({ xIsNext, squares, onPlay }) => {
  const winningSquareStyle = {
    background: "red",
  };

  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)[0]) return;
    const nextSquares = squares.slice();
    xIsNext ? (nextSquares[i] = "X") : (nextSquares[i] = "O");
    if (calculateWinner(nextSquares)[0]) {
      // if game over
      onPlay(nextSquares);
    } else if (nextSquares.every((pos) => pos !== null)) {
      // if game drawn
      onPlay(nextSquares);
    } else {
      onPlay(nextTurn(nextSquares));
    }
  }

  const nextTurn = (nextSquares) => {
    const pos = pickRandom(nextSquares);
    nextSquares[pos] = "O";
    return nextSquares;
  };

  const pickNextAvailable = (nextSquares) => {
    for (let i = 0; i < nextSquares.length; i++) {
      if (!nextSquares[i]) {
        return i;
      }
    }
  };

  const pickRandom = (nextSquares) => {
    while (true) {
      const possibleNext = Math.floor(Math.random() * nextSquares.length);
      console.log("trying ", possibleNext);
      if (!nextSquares[possibleNext]) return possibleNext;
    }
  };

  const [winner, winningSquares] = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    if (squares.some((pos) => pos === null)) {
      status = "Next player: " + (xIsNext ? "X" : "O");
    } else {
      status = "Game drawn";
    }
  }

  const generateSquares = (i, style) => {
    return (
      <Square
        key={i}
        value={squares[i]}
        onSquareClick={() => handleClick(i)}
        style={style}
      />
    );
  };

  const boardRows = [];
  for (let i = 0; i < 3; i++) {
    const squaresInRow = [];
    for (let j = 0; j < 3; j++) {
      const col = i * 3 + j;
      if (winner && winningSquares.includes(col)) {
        squaresInRow.push(generateSquares(col, winningSquareStyle));
      } else {
        squaresInRow.push(generateSquares(col, null));
      }
    }
    boardRows.push(
      <div className="board-row" key={i}>
        {squaresInRow}
      </div>
    );
  }

  return (
    <>
      <div className="status">{status}</div>
      {boardRows}
    </>
  );
};

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  const handlePlay = (nextSquares) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const jumpTo = (nextMove) => {
    setCurrentMove(nextMove);
  };

  const moves = history.map((squares, move) => {
    if (move === currentMove) {
      return <li key={move}>{`You are at move ${move}`}</li>;
    }

    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={true} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ul>{moves}</ul>
      </div>
    </div>
  );
};

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], [a, b, c]];
    }
  }
  return [null, null];
};

const App = () => {
  return (
    <div>
      <h1>Tic tac toe</h1>
      <Game />
    </div>
  );
};

export default App;
