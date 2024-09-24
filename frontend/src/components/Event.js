import React, { useState } from "react";

const Event = ({ match, setMatch }) => {
  // State to store selected batsman, non-striker, and bowler
    const [selectedBatsman, setSelectedBatsman] = useState({
      name: "Select batsman",
  });
    const [selectedNonStriker, setSelectedNonStriker] = useState({
      name: "Select non-striker",
  });
    const [selectedBowler, setSelectedBowler] = useState({
        name: "Select bowler",
    });
    
    const [events] = useState(["Wide + runs", "Noball + runs", "Noball + bye", "Noball + legbye", "Legbye/Bye + Overthrow", "Runs + OT (Overthrow)"]);
    const [event, setEvent] = useState("None");


  // Handles selecting a batsman
  const handleBatsmanChange = (e) => {
    setSelectedBatsman(e.target.value);
    const selectedPlayer = match.teamA.players.find(player => player._id === e.target.value);
    setSelectedBatsman({ ...selectedPlayer });
  };

  // Handles selecting a non-striker
  const handleNonStrikerChange = (e) => {
    setSelectedNonStriker(e.target.value);
      const selectedPlayer = match.teamA.players.find(player => player._id === e.target.value)
        setSelectedNonStriker({ ...selectedPlayer });
  };

  // Handles selecting a bowler
  const handleBowlerChange = (e) => {
    setSelectedBowler(e.target.value);
    const selectedPlayer = match.teamB.players.find(player => player._id === e.target.value);
    setSelectedBowler({ ...selectedPlayer });
    };

    const handleEventChange = (e) => {
        setEvent(e.target.value);
    };
    
    const handleEvent = (event) => {
        // Create a new match object to avoid direct mutation
        const updatedMatch = { ...match };
      
        switch (event) {
          case "Wide + runs":
            updatedMatch.extras.wides += 1;
            updatedMatch.runsScored += 1; // Add runs to the team's total score
            updatedMatch.balls += 1; // Update balls faced if needed
            updatedMatch.teamA.totalScore += 1; // Update the total score of the team
            updatedMatch.teamA.players.map((player) => {
              if (player._id === selectedBatsman._id) {
                player.runs += 1; // Update the individual player's score
                player.ballsFaced += 0; // No ball faced in case of a wide
              }
              return player;
            });
            updatedMatch.teamB.players.map((player) => {
              if (player._id === selectedBowler._id) {
                player.runs += 1; // Bowler concedes 1 run
              }
              return player;
            });
            break;
      
          case "Noball + runs":
            updatedMatch.extras.noballs += 1;
            updatedMatch.runsScored += 1; // Increment the score
            updatedMatch.teamA.totalScore += 1;
            updatedMatch.teamA.players.map((player) => {
              if (player._id === selectedBatsman._id) {
                player.runs += 1;
                player.ballsFaced += 0; // No ball faced in case of no ball
              }
              return player;
            });
            updatedMatch.teamB.players.map((player) => {
              if (player._id === selectedBowler._id) {
                player.runs += 1; // Bowler concedes a run
              }
              return player;
            });
            break;
      
          case "Noball + bye":
            updatedMatch.extras.noballs += 1;
            updatedMatch.extras.byes += 1;
            updatedMatch.runsScored += 1;
            updatedMatch.teamA.totalScore += 1;
            updatedMatch.teamB.players.map((player) => {
              if (player._id === selectedBowler._id) {
                player.runs += 1;
              }
              return player;
            });
            break;
      
          case "Noball + legbye":
            updatedMatch.extras.noballs += 1;
            updatedMatch.extras.legbyes += 1;
            updatedMatch.runsScored += 1;
            updatedMatch.teamA.totalScore += 1;
            updatedMatch.teamB.players.map((player) => {
              if (player._id === selectedBowler._id) {
                player.runs += 1;
              }
              return player;
            });
            break;
      
          case "Legbye/Bye + Overthrow":
            updatedMatch.extras.overthrows += 1;
            updatedMatch.runsScored += 1;
            updatedMatch.teamA.totalScore += 1;
            updatedMatch.teamA.players.map((player) => {
              if (player._id === selectedBatsman._id) {
                player.runs += 1;
              }
              return player;
            });
            updatedMatch.teamB.players.map((player) => {
              if (player._id === selectedBowler._id) {
                player.runs += 1;
              }
              return player;
            });
            break;
      
          case "Runs + OT (Overthrow)":
            updatedMatch.runsScored += 1; // Increment the team's runs
            updatedMatch.extras.overthrows += 1;
            updatedMatch.teamA.totalScore += 1;
            updatedMatch.teamA.players.map((player) => {
              if (player._id === selectedBatsman._id) {
                player.runs += 1;
              }
              return player;
            });
            updatedMatch.teamB.players.map((player) => {
              if (player._id === selectedBowler._id) {
                player.runs += 1; // Bowler concedes an additional run due to overthrow
              }
              return player;
            });
            break;
      
          default:
            console.log("No valid event selected");
        }
      
        // Update the local match state with the new match data
        setMatch(updatedMatch);
        console.log(updatedMatch);
      };
      
      

  const saveMatch = async (match) => {
    // Send a request to save the updated match
    try {
      const response = await fetch(`http://localhost:4000/matches/${match._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ match: match }),
      });

      const data = await response.json();
      if (!data.success) {
        console.log(data.error);
        alert("Failed to save match data");
      } else {
          console.log(data, "Match saved successfully");
      }
    } catch (error) {
      console.error("Error saving match:", error);
    }
  };

  return (
    <div className="Event">
      <h3>Event Actions</h3>

      {/* Select Batsman */}
      <div className="eventDiv">
        <label>Select On-Strike Batsman: </label>
        <select value={selectedBatsman} onChange={handleBatsmanChange}>
          <option value="">{selectedBatsman.name}</option>
          {match.teamA.players.map((player) => (
            <option key={player._id} value={player._id}>
              {player.name} ({player.type})
            </option>
          ))}
        </select>
      </div>

      {/* Select Non-Striker */}
      <div className="eventDiv">
        <label>Select Non-Strike Batsman: </label>
        <select value={selectedNonStriker} onChange={handleNonStrikerChange}>
                  <option value="">{selectedNonStriker.name}</option>
          {match.teamA.players.map((player) => (
            <option key={player._id} value={player._id}>
              {player.name} ({player.type})
            </option>
          ))}
        </select>
      </div>

      {/* Select Bowler */}
      <div className="eventDiv">
        <label>Select Bowler: </label>
        <select value={selectedBowler} onChange={handleBowlerChange}>
                  <option value="">{ selectedBowler.name}</option>
          {match.teamB.players.map((player) => (
            <option key={player._id} value={player._id}>
              {player.name} ({player.type})
            </option>
          ))}
        </select>
          </div>
          
          {/* Select Event */}
            <div className="eventDiv">
                <label>Select Event: </label>
                <select value={event} onChange={handleEventChange}>
                    <option value="">Select Event</option>
                    {events.map((event) => (
                        <option key={event} value={event}>
                            {event}
                        </option>
                    ))}
              </select>
              
              <button onClick={() => handleEvent(event)}>Save Event</button>
              
            </div>

      {/* Buttons to trigger various match events */}
      <button onClick={() =>saveMatch(match)}>Save Match</button>

      {/* Additional buttons for handling other events like Noball, Legbye, Overthrow can be added similarly */}
    </div>
  );
};

export default Event;
