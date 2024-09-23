// src/models/player.model.ts
import { Schema, model, Document } from 'mongoose';

interface IPlayer extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  type: 'batsman' | 'bowler' | 'allrounder';
  runs: number;
  ballsFaced: number;
  wickets: number;
  ballsBowled: number;
  teamId: Schema.Types.ObjectId;
}

const playerSchema = new Schema<IPlayer>({
  _id: Schema.Types.ObjectId,
  name: { type: String, required: true },
  type: { type: String, enum: ['batsman', 'bowler', 'allrounder'], required: true },
  runs: { type: Number, default: 0 },
  ballsFaced: { type: Number, default: 0 },
  wickets: { type: Number, default: 0 },
  ballsBowled: { type: Number, default: 0 },
  teamId: { type: Schema.Types.ObjectId, ref: 'Team', required: true }
});

export const Player = model<IPlayer>('Player', playerSchema);
