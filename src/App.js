import "./style/style.scss";
import Maze from "./components/Maze";
import React, { useState, useEffect } from "react";

const App = () => {
  const [rowCol, setRowCol] = useState({
    col: 29,
    row: 29,
  });
  const [maze, setMaze] = useState({
    score: 0,
    time: rowCol.col * 3,
    started: false,
    point: 0,
    points: [],
    mazeMap: [],
    recent: [],
    end: { x: 0, y: 0 },
    start: { x: 0, y: 0 },
    coordinate: { x: 0, y: 0 },
  });
  // const onChange = (e) => {
  //   const { value, name } = e.target;
  //   if (!Number.isInteger(parseInt(value))) {
  //     setRowCol({
  //       ...rowCol,
  //       [name]: 0,
  //     });
  //     return;
  //   }
  //   if (value > 99) {
  //     console.log("너무큼");
  //     return;
  //   }
  //   setRowCol({
  //     ...rowCol,
  //     [name]: value < 1 ? 1 : parseInt(value),
  //   });
  // };
  const onKeyDown = (e) => {
    if (!maze.started) {
      return;
    }
    const MAX_X = rowCol.col;
    const MAX_Y = rowCol.row;
    const x = maze.coordinate.x;
    const y = maze.coordinate.y;
    const recent = [...maze.recent]
      .filter((recent) => recent.x !== x || recent.y !== y)
      .concat({ x, y })
      .slice(-13);
    switch (e.code) {
      case "ArrowDown":
        if (
          y + 1 < MAX_Y &&
          y + 1 >= 0 &&
          maze.mazeMap[maze.coordinate.y + 1][x].item
        ) {
          setMaze({
            ...maze,
            coordinate: { x: x, y: y + 1 },
            recent,
          });
        }
        break;
      case "ArrowUp":
        if (y - 1 < MAX_Y && y - 1 >= 0 && maze.mazeMap[y - 1][x].item) {
          setMaze({
            ...maze,
            coordinate: { x: x, y: y - 1 },
            recent,
          });
        }
        break;
      case "ArrowLeft":
        if (x - 1 < MAX_X && x - 1 >= 0 && maze.mazeMap[y][x - 1].item) {
          setMaze({
            ...maze,
            coordinate: { x: x - 1, y: y },
            recent,
          });
        }
        break;
      case "ArrowRight":
        if (x + 1 < MAX_X && x + 1 >= 0 && maze.mazeMap[y][x + 1].item) {
          setMaze({
            ...maze,
            coordinate: { x: x + 1, y: y },
            recent,
          });
        }
        break;
      default:
    }
  };

  useEffect(() => {
    if (rowCol.col % 2 === 0 || rowCol.row % 2 === 0) {
      return;
    }
    setMaze((prev) => {
      let bricksIndex = -1;
      return {
        ...prev,
        mazeMap: [...new Array(rowCol.col)].map(() => {
          return [...new Array(rowCol.row)].map(() => {
            bricksIndex++;
            return {
              index: bricksIndex,
              item: true,
            };
          });
        }),
      };
    });
  }, [rowCol]);

  return (
    <div className="App" onKeyDown={onKeyDown} tabIndex="0">
      <p className="header">미로 게임</p>
      <p className="info mg">최종 : {maze.score} 점</p>
      <div>
        세로
        <input
          className="col input"
          name="col"
          value={rowCol.col}
          readOnly={true}
        />
        <span className="mr">칸</span>
        가로
        <input
          className="row input"
          name="row"
          value={rowCol.row}
          readOnly={true}
        />
        <span className="mr">칸</span>
      </div>

      <Maze maze={maze} setMaze={setMaze} rowCol={rowCol} />
    </div>
  );
};

export default App;
