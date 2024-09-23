const Player = ({ player }) => {
    return (
        <div className="Player">
            <h4>name: {player.name}</h4>
            <p>{player.type}</p>
            <div className="PlayerExtras">
                <p>runs: {player.runs}</p>
                <p>ballsFaced: {player.ballsFaced}</p>
                <p>wickets: {player.wickets}</p>
            </div>
        </div>
    );
};
 
export default Player;