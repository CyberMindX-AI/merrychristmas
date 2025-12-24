import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';

// Simple Grid Maze: 1 = Wall, 0 = Path, 2 = Start, 3 = Goal
// Harder Grid Maze: 1 = Wall, 0 = Path, 2 = Start, 3 = Goal
const initialMaze = [
    [2, 0, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 1, 1, 0, 1, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
    [0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 1, 0, 0],
    [1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 0, 0, 3],
];

const MazeGame = ({ onWin }) => {
    const [playerPos, setPlayerPos] = useState({ x: 0, y: 0 }); // Start at 0,0
    const [won, setWon] = useState(false);

    // Find start position if dynamic, but hardcoded to 0,0 for now matches the grid.

    const handleMove = (dx, dy) => {
        if (won) return;

        const newX = playerPos.x + dx;
        const newY = playerPos.y + dy;

        // Boundary check
        if (newX < 0 || newX >= 10 || newY < 0 || newY >= 10) return;

        // Wall check
        if (initialMaze[newY][newX] === 1) return;

        // Move
        setPlayerPos({ x: newX, y: newY });

        // Win check
        if (initialMaze[newY][newX] === 3) {
            setWon(true);
            setTimeout(() => {
                onWin();
            }, 2500); // Wait a bit to celebrate
        }
    };

    // Keyboard controls
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (won) return;
            switch (e.key) {
                case 'ArrowUp': handleMove(0, -1); break;
                case 'ArrowDown': handleMove(0, 1); break;
                case 'ArrowLeft': handleMove(-1, 0); break;
                case 'ArrowRight': handleMove(1, 0); break;
                default: break;
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [playerPos, won]);

    return (
        <div className="maze-container">
            {won && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={500} />}

            <div className="maze-header">
                <h2 className="title-game" style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Help him find her!</h2>
                <p className="sub-text" style={{ fontSize: '0.9rem' }}>Use arrow keys or buttons</p>
            </div>

            <div className="maze-grid">
                {initialMaze.map((row, y) => (
                    <div key={y} className="maze-row">
                        {row.map((cell, x) => {
                            let cellClass = "maze-cell";
                            if (cell === 1) cellClass += " wall";
                            if (cell === 3) cellClass += " goal";

                            const isPlayer = playerPos.x === x && playerPos.y === y;

                            return (
                                <div key={`${x}-${y}`} className={cellClass}>
                                    {isPlayer && <motion.div layoutId="player" className="player-marker">👨</motion.div>}
                                    {cell === 3 && !isPlayer && <span className="goal-marker">👩</span>}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>

            <div className="controls">
                <div className="control-row">
                    <button className="ctrl-btn up" onClick={() => handleMove(0, -1)}>▲</button>
                </div>
                <div className="control-row">
                    <button className="ctrl-btn left" onClick={() => handleMove(-1, 0)}>◀</button>
                    <button className="ctrl-btn down" onClick={() => handleMove(0, 1)}>▼</button>
                    <button className="ctrl-btn right" onClick={() => handleMove(1, 0)}>▶</button>
                </div>
            </div>
        </div>
    );
};

export default MazeGame;
