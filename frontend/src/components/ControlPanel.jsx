import React from 'react';
import './Control.css';

const ControlPanel = () => {
    const setWinControl = (control) => {
        fetch('http://localhost:3000/set-win-control', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ control }),
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data.status === 'success') alert(`Control set to ${control}`);
            })
            .catch(error => console.error('Error setting win control:', error));
    };


    return (
        <div>
            <h1>Control Game Outcome</h1>
            <button onClick={() => setWinControl('win')}>Win</button>
            <button onClick={() => setWinControl('lose')}>Lose</button>
            <button onClick={() => setWinControl('random')}>Random</button>
        </div>
    );
};

export default ControlPanel;
