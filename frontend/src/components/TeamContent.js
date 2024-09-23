import React, { useState } from 'react';
import AddPlayer from './AddPlayer';
 
const TeamComponent = ({ team, deleteTeam }) => {
    const [showAddPlayer, setShowAddPlayer] = useState(false);
  return (
    <div className='TeamContent'>
      <h2>{team.name}</h2>
      <p> Total Score:  {team.totalScore}</p>
      <p> Wickets Lost:  {team.wicketsLost}</p>

      <div>
        <h4>Extras:</h4>
        <p> Wides:  {team.extras.wides}</p>
        <p> No Balls:  {team.extras.noballs}</p>
        <p> Byes:  {team.extras.byes}</p>
        <p> Leg Byes:  {team.extras.legbyes}</p>
        <p> Overthrows:  {team.extras.overthrows}</p>
      </div>
          <button onClick={() => deleteTeam(team._id)}>
              Delete Team
          </button>
    </div>
  );
};

export default TeamComponent;
