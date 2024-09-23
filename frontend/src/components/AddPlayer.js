import React, { useState } from 'react';

const AddPlayer = ({teamdId}) => {
    const [playerName, setPlayerName] = useState('');
    const [playerType, setPlayerType] = useState('');
    const addPlayer = async () => {
        //Send a POST request to the server to save the player
        if (!playerName) {
            alert('Please enter a player name');
            return;
        }
        if (!playerType) {
            alert('Please select a player type');
            return;
        }
        try {
            const response = await fetch(`http://localhost:4000/teams/players`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: playerName, teamdId: teamdId , type: playerType }),
            });
            const data = await response.json();
            console.log(data);
            if (!data.success) {
                alert(data.error);
            } else {
                console.log('Player added successfully');
            }
        } catch (error) {
            console.error('Error adding player:', error);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Player Name"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
            />
            <select name="playerType" id="playerType" onChange={(e)=>setPlayerType(e.target.value)}>
                <option value="batsman">Batsman</option>
                <option value="bowler">Bowler</option>
                <option value="allrounder">All-Rounder</option>
            </select>
            <button onClick={addPlayer}>Add Player</button>
        </div>
    );
};
 
export default AddPlayer;