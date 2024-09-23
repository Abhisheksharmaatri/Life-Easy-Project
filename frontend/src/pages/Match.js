import Reqct, { useState, useEffect } from 'react';

const Match = () => {
    const [teamA, setTeamA] = useState('');
    const [teamB, setTeamB] = useState('');
    const [teams, setTeams] = useState([]);

    const [matches, setMatches] = useState([]);
    const [updatedPage, setUpdatedPage] = useState(false);

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
        const fetchMatches = async () => {
            try {
                const response = await fetch('http://localhost:4000/matches');
                const data = await response.json();
                if (!data.success) {
                    console.log("alert")
                    console.log(data)
                    alert(data.error);
                } else {
                    console.log(data.matches);
                    setMatches(data.matches);
                }
            } catch (error) {
                console.error('Error fetching matches:', error);
            }
        }
        fetchMatches();
    }, [updatedPage]);

    const startMatch = async () => { 
        // Send a POST request to the server to start the match
        if (!teamA || !teamB) {
            alert('Please select both teams');
            return;
        }
        try {
            const response = await fetch('http://localhost:4000/matches', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ teamA, teamB}),
            });
            const data = await response.json();
            console.log(data);
            if (!data.success) {
                alert(data.error);
            } else {
                setUpdatedPage(!updatedPage);
                console.log('Match started successfully');
            }
        } catch (error) {
            console.error('Error starting match:', error);
        }
    };

    return (
        <div className='match'>
            <h1>Match</h1>
            <div>
                <select name="teamA" id="teamA" onChange={(e) => setTeamA(e.target.value)}>
                    <option value="">Select Team A</option>
                    {teams.map((team, index) => (
                        <option key={index} value={team._id}>{team.name}</option>
                    ))}
                </select>
                <select name="teamB" id="teamB" onChange={(e) => setTeamB(e.target.value)}>
                    <option value="">Select Team B</option>
                    {teams.map((team, index) => (
                        <option key={index} value={team._id}>{team.name}</option>
                    ))}
                </select>
            </div>
            <button onClick={startMatch}>Start Match</button>
            <h2>Matches</h2>
            {matches.map((match, index) => (
                <div key={index}>
                    <p><strong>Team A:</strong> {match.teamA.name}</p>
                    <p><strong>Team B:</strong> {match.teamB.name}</p>
                    <a href={`/matches/${match._id}`}>View Match</a>
                </div>
            ))}
        </div>
    );
};

export default Match;