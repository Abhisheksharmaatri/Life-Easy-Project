// src/models/team.model.ts
import { Schema, model, Document } from 'mongoose';

interface ITeam extends Document {
  name: string;
  totalScore: number;
  wicketsLost: number;
  extras: {
    wides: number;
    noballs: number;
    byes: number;
    legbyes: number;
    overthrows: number;
  };
  players: {
    name: string;
    type: 'batsman' | 'bowler' | 'allrounder';
    runs: number;
    ballsFaced: number;
    wickets: number;
    ballsBowled: number;
  }[];
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  totalScore: { type: Number, default: 0 },
  wicketsLost: { type: Number, default: 0 },
  extras: {
    wides: { type: Number, default: 0 },
    noballs: { type: Number, default: 0 },
    byes: { type: Number, default: 0 },
    legbyes: { type: Number, default: 0 },
    overthrows: { type: Number, default: 0 }
  },
  // Array of player IDs
  players: [{
    name: { type: String, required: true },
    type: { type: String, enum: ['batsman', 'bowler', 'allrounder'], required: true },
    runs: { type: Number, default: 0 },
    ballsFaced: { type: Number, default: 0 },
    wickets: { type: Number, default: 0 },
    ballsBowled: { type: Number, default: 0 }
   }]
});

export const Team = model<ITeam>('Team', teamSchema);
