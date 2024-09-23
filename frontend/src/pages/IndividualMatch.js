import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams to get URL parameters

import Team from "../../../frontend/src/components/Team";
import Event from "../../../frontend/src/components/Event";

const IndividualMatch = () => {
    const { id } = useParams(); // Get the match id from the route
    const [match, setMatch] = useState({
        teamA: {
            name: "",
            players:[]
        },
        teamB: {
            name: "",
            players:[]
        },
        bowler: {
            name: "",
            _id: ""
        }
    });

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await fetch(`http://localhost:4000/matches/${id}`); // Use id in the API URL
                const data = await response.json();
                if (!data.success) {
                    console.log(data)
                    alert(data.error);
                } else {
                    console.log(data);
                    setMatch(data.match);
                }
            } catch (error) {
                console.error('Error fetching teams:', error);
            }
        };
        fetchTeams();
    }, [id]); // Add id as a dependency to the useEffect hook

    return (
        <div className="IndividualMatch">
            <div>
                <h1>Match</h1> 
                <h3>Events:</h3>
                <Event match={match} setMatch={setMatch}/>
            </div>
            <div className="TeamListMatch">
                <Team team={match.teamA} />
                <Team team={match.teamB} />
            </div>
        </div>
    );
};

export default IndividualMatch;
