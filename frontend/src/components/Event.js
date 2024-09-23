import React, { useState } from "react";

const Event = ({ match, setMatch }) => {
    const [batsman, setBatsman] = useState({});
    const [bowler, setBowler] = useState({});
    const [nonStriker, setNonStriker] = useState({});
    const [eventType, setEventType] = useState(""); // State for event type
    const [runs, setRuns] = useState(0); // State for runs for the event
    const [extras, setExtras] = useState({ wide: 0, noball: 0, legbye: 0, bye: 0, overthrow: 0 }); 

    // Copy the passed match state to a local variable for modification
    const localMatch = { ...match }; // FIX: define localMatch by copying from match prop

    const updatePlayerStats = () => {
        // Ensure that batsman and bowler stats exist before updating them
        if (!localMatch.batsmanStats[batsman.name]) {
            localMatch.batsmanStats[batsman.name] = { runs: 0, ballsFaced: 0 };
        }
        if (!localMatch.bowlerStats[bowler.name]) {
            localMatch.bowlerStats[bowler.name] = { runsConceded: 0, wicketsTaken: 0 };
        }

        switch (eventType) {
            case "Wide + runs":
                localMatch.extras.wide += runs;
                localMatch.teamB.stats.runsConceded += runs;
                break;
            case "Noball + bye":
                localMatch.extras.noball += 1;
                localMatch.extras.bye += (runs - 1);
                localMatch.teamB.stats.runsConceded += runs;
                localMatch.batsmanStats[batsman.name].ballsFaced += 1;
                break;
            case "Noball + runs":
                localMatch.extras.noball += 1;
                localMatch.batsmanStats[batsman.name].runs += (runs - 1);
                localMatch.batsmanStats[batsman.name].ballsFaced += 1;
                localMatch.teamB.stats.runsConceded += runs;
                break;
            case "Noball + legbye":
                localMatch.extras.noball += 1;
                localMatch.extras.legbye += (runs - 1);
                localMatch.teamB.stats.runsConceded += runs;
                localMatch.batsmanStats[batsman.name].ballsFaced += 1;
                break;
            case "Legbye/Bye + Overthrow":
                localMatch.extras.legbye += runs;
                localMatch.teamB.stats.runsConceded += runs;
                break;
            case "Runs + OT (Overthrow)":
                localMatch.batsmanStats[batsman.name].runs += runs;
                localMatch.teamB.stats.runsConceded += runs;
                break;
            default:
                console.log("Invalid event type");
        }

        // Update the local match state with the updated stats
        setMatch(localMatch);
        console.log("Updated Local Match: ", localMatch);
    };

    const addEvent = () => {
        if (!batsman.name || !bowler.name || !nonStriker.name) {
            alert("Please select a batsman, bowler, and non-striker");
            return;
        }

        // Update local player stats based on the event
        updatePlayerStats();
        alert("Event added locally!");
    };

    const saveMatch = async () => {
        if (!batsman || !bowler || !nonStriker) {
            alert("Please select a batsman, bowler, and non-striker");
            return;
        }

        try {
            // Save the locally updated match to the backend
            const response = await fetch(`http://localhost:4000/matches/${match._id}/event`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(localMatch), // Send the updated local match object
            });
            const data = await response.json();
            if (!data.success) {
                alert(data.error);
            } else {
                console.log("Match event saved successfully");
            }
        } catch (error) {
            console.error("Error saving match event:", error);
        }
    };

    return (
        <div className="event">
            <select name="batsman" id="batsman" onChange={(e) => setBatsman(JSON.parse(e.target.value))}>
                <option value="">Select Batsman</option>
                {match.teamA.players.map((player, index) => (
                    <option value={JSON.stringify(player)} key={index}>{player.name}</option>
                ))}
            </select>
            <select name="bowler" id="bowler" onChange={(e) => setBowler(JSON.parse(e.target.value))}>
                <option value="">Select Bowler</option>
                {match.teamB.players.map((player, index) => (
                    <option value={JSON.stringify(player)} key={index}>{player.name}</option>
                ))}
            </select>
            <select name="nonStriker" id="nonStriker" onChange={(e) => setNonStriker(JSON.parse(e.target.value))}>
                <option value="">Select Non-Striker</option>
                {match.teamA.players.map((player, index) => (
                    <option value={JSON.stringify(player)} key={index}>{player.name}</option>
                ))}
            </select>

            {/* Select event type */}
            <select name="eventType" id="eventType" onChange={(e) => setEventType(e.target.value)}>
                <option value="">Select Event Type</option>
                <option value="Wide + runs">Wide + runs</option>
                <option value="Noball + bye">Noball + bye</option>
                <option value="Noball + runs">Noball + runs</option>
                <option value="Noball + legbye">Noball + legbye</option>
                <option value="Legbye/Bye + Overthrow">Legbye/Bye + Overthrow</option>
                <option value="Runs + OT (Overthrow)">Runs + OT (Overthrow)</option>
            </select>

            {/* Input runs */}
            <input
                type="number"
                name="runs"
                id="runs"
                value={runs}
                onChange={(e) => setRuns(Number(e.target.value))}
                placeholder="Enter Runs"
            />

            {/* Add Event Button */}
            <button onClick={addEvent}>Add Event</button>

            {/* Save Match Button */}
            <button onClick={saveMatch}>Save Match Event</button>
        </div>
    );
};

export default Event;
