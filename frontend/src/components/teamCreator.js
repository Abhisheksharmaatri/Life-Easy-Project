import React, { useState, useEffect } from 'react';
import TeamContent from './TeamContent';


const TeamCreator = () => {
    const [teams, setTeams] = useState([]);
    const [teamName, setTeamName] = useState('');
    const [players, setPlayers] = useState(
        Array(11).fill({ name: '', type: 'batsman' }) // Default type set to 'batsman'
    );
    const [updatedPage, setUpdatedPage] = useState(false);

    // Fetch the teams from the server when the component mounts
    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await fetch('http://localhost:4000/teams');
                const data = await response.json();
                if (!data.success) {
                    alert(data.error);
                } else {
                    console.log(data.teams);
                    setTeams(data.teams);
                }
            } catch (error) {
                console.error('Error fetching teams:', error);
            }
        };
        fetchTeams();
    }, [updatedPage]);

    const handlePlayerChange = (index, value, field) => {
        // Update the specific player's name or type in the players array
        const newPlayers = [...players];
        newPlayers[index] = { ...newPlayers[index], [field]: value };
        setPlayers(newPlayers);
    };

    const addTeam = async () => {
        // Send a POST request to the server to save the team with players and their types
        try {
            const response = await fetch('http://localhost:4000/teams', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: teamName, players }), // Send team name and players array
            });
            const data = await response.json();
            if (!data.success) {
                alert(data.error);
            } else {
                setUpdatedPage(!updatedPage);
                setTeamName(''); // Reset the team name input
                setPlayers(Array(11).fill({ name: '', type: 'batsman' })); // Reset the players array
            }
        } catch (error) {
            console.error('Error adding team:', error);
        }
    };

    const deleteTeam = async (index) => {
        // Send a DELETE request to the server to delete the team
        try {
            const response = await fetch(`http://localhost:4000/teams/${index}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (!data.success) {
                alert(data.error);
            } else {
                setUpdatedPage(!updatedPage);
            }
        } catch (error) {
            console.error('Error deleting team:', error);
        }
    };

    const updateTeam = async (index, newName) => {
        // Send a PUT request to the server to update the team
        try {
            const response = await fetch(`http://localhost:4000/teams/${index}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: newName }),
            });
            const data = await response.json();
            if (!data.success) {
                alert(data.error);
            } else {
                setUpdatedPage(!updatedPage);
            }
        } catch (error) {
            console.error('Error updating team:', error);
        }
    };

    return (
        <div className="teamCreator">
            <div className='teamCreatorList'>
                <h1>Team Creator</h1>
                <input
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="Team Name"
                />
                <br />
                <br />

                {/* Add Player List */}
                <h2>Player List</h2>
                {players.map((player, index) => (
                    <div key={index}>
                        <input
                            type="text"
                            value={player.name}
                            onChange={(e) => handlePlayerChange(index, e.target.value, 'name')}
                            placeholder={`Player ${index + 1} Name`}
                        />
                        <select
                            value={player.type}
                            onChange={(e) => handlePlayerChange(index, e.target.value, 'type')}
                        >
                            <option value="batsman">Batsman</option>
                            <option value="bowler">Bowler</option>
                            <option value="all-rounder">All-Rounder</option>
                        </select>
                    </div>
                ))}

                <button onClick={addTeam}>Add Team</button>
            </div>
            <div className='TeamCreatorList'>
                {teams.length > 0 ? (
                    teams.map((team, index) => (
                        <TeamContent team={team} key={index} deleteTeam={deleteTeam} />
                    ))
                ) : (
                    <p>No teams available</p>
                )}
            </div>
        </div>
    );
};

export default TeamCreator;
