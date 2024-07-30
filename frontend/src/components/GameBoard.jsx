import React, { useEffect, useState } from 'react';

const GameBoard = () => {
    const [tiles, setTiles] = useState(Array(30).fill('gray'));
    const [winControl, setWinControl] = useState('random');

    useEffect(() => {
        fetch('http://localhost:3000/get-win-control')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setWinControl(data.control))
            .catch(error => console.error('Error fetching win control:', error));
    }, []);

    const revealAllTiles = (index) => {
        fetch('http://localhost:3000/reveal-tiles', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ index }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setTiles(data.tiles))
            .catch(error => console.error('Error revealing tiles:', error));
    };

    return (
        <div>
            <h1>Minesweeper Game</h1>
            <div className="grid">
                {tiles.map((tile, index) => (
                    <div
                        key={index}
                        className={`tile ${tile}`}
                        onClick={() => {
                            if (tile === 'gray') revealAllTiles(index);
                        }}
                    />
                ))}
            </div>
        </div>
    );
};

export default GameBoard;
