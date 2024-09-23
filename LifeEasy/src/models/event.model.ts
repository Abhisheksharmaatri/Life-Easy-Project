// src/models/event.model.ts
import { Schema, model, Document } from 'mongoose';

interface IEvent extends Document {
  matchId: Schema.Types.ObjectId;
  eventType: 'normal' | 'wide' | 'noball' | 'overthrow' | 'bye' | 'legbye' | 'wicket';
  runs: number;
  overthrows?: number;
  batsmanId: Schema.Types.ObjectId;
  bowlerId: Schema.Types.ObjectId;
}

const eventSchema = new Schema<IEvent>({
  matchId: { type: Schema.Types.ObjectId, ref: 'Match', required: true },
  eventType: { type: String, enum: ['normal', 'wide', 'noball', 'overthrow', 'bye', 'legbye', 'wicket'], required: true },
  runs: { type: Number, default: 0 },
  overthrows: { type: Number, default: 0 },
  batsmanId: { type: Schema.Types.ObjectId, ref: 'Player', required: true },
  bowlerId: { type: Schema.Types.ObjectId, ref: 'Player', required: true }
});

export const Event = model<IEvent>('Event', eventSchema);
