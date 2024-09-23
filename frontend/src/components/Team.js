import Player from './Player';
const Team = ({ team }) => { 
    console.log(team);
    return (
        <div className='Team'>
            <h2>{team.name}</h2>
            <p>Total Score: {team.totalScore}</p>
            <p>Wickets Lost: {team.wicketsLost}</p>
            <h3>Players</h3>
            {team.players.map((player, index) => (
                <Player key={index} player={player} />
            ))}
        </div>
    );
}
export default Team;