import { useState } from "react";

const initialGameDashboard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default function GameDashboard({ onSelectSquare, activePlayerSymbol }) {
  const [gameBoard, setGameBoard] = useState(initialGameDashboard);

  function handleSelectSquare(event, rowIdx, colIndex) {
    setGameBoard((prevGameBoard) => {
      const newGameBoard = [
        ...prevGameBoard.map((innerArray) => [...innerArray]),
      ];
      newGameBoard[rowIdx][colIndex] = activePlayerSymbol;
      return newGameBoard;
    });

    onSelectSquare();
  }
  return (
    <ol>
      {gameBoard.map((row, rowIdx) => (
        <li key={rowIdx}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={handleSelectSquare(rowIdx, colIndex)}>
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
