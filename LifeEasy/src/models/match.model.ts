import mongoose, { Document, Schema } from 'mongoose';

interface IMatch extends Document {
  teamA: mongoose.Types.ObjectId;
  teamB: mongoose.Types.ObjectId;
  onStrikeBatsman: {
    name: string;
    type: 'batsman' | 'bowler' | 'allrounder';
    runs: number;
    ballsFaced: number;
    wickets: number;
    ballsBowled: number;
  }[];
  nonStrikeBatsman: {
    name: string;
    type: 'batsman' | 'bowler' | 'allrounder';
    runs: number;
    ballsFaced: number;
    wickets: number;
    ballsBowled: number;
  }[];
  bowler: {
    name: string;
    type: 'batsman' | 'bowler' | 'allrounder';
    runs: number;
    ballsFaced: number;
    wickets: number;
    ballsBowled: number;
  }[];
  overs: number;
  balls: number;
  wicketsLost: number;
  runsScored: number;
  extras: {
    wides: number;
    noballs: number;
    byes: number;
    legbyes: number;
    overthrows: number;
  };
}

const MatchSchema = new Schema({
  teamA: { type: mongoose.Types.ObjectId, ref: 'Team', required: true },
  teamB: { type: mongoose.Types.ObjectId, ref: 'Team', required: true },
  onStrikeBatsman: {
    name: { type: String, required: true },
    type: { type: String, enum: ['batsman', 'bowler', 'allrounder'], required: true },
    runs: { type: Number, default: 0 },
    ballsFaced: { type: Number, default: 0 },
    wickets: { type: Number, default: 0 },
    ballsBowled: { type: Number, default: 0 }
  },
  nonStrikeBatsman: {
    name: { type: String, required: true },
    type: { type: String, enum: ['batsman', 'bowler', 'allrounder'], required: true },
    runs: { type: Number, default: 0 },
    ballsFaced: { type: Number, default: 0 },
    wickets: { type: Number, default: 0 },
    ballsBowled: { type: Number, default: 0}
  },
    bowler: {
    name: { type: String, required: true },
  },
  overs: { type: Number, default: 0 },       // Total overs bowled
  balls: { type: Number, default: 0 },       // Total balls bowled in match
  wicketsLost: { type: Number, default: 0 }, // Total wickets lost
  runsScored: { type: Number, default: 0 },  // Total runs scored by the team

  // Extras: wide, no-balls, byes, leg-byes, overthrows
  extras: {
    wides: { type: Number, default: 0 },
    noballs: { type: Number, default: 0 },
    byes: { type: Number, default: 0 },
    legbyes: { type: Number, default: 0 },
    overthrows: { type: Number, default: 0 }
  },
});

export const Match = mongoose.model<IMatch>('Match', MatchSchema);
