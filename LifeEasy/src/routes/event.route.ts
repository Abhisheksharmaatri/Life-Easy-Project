import { Router, Request, Response } from 'express';
import { Event } from '../models/event.model';
import { Match } from '../models/match.model';
import { Player } from '../models/player.model';

const router = Router();

// Log a scoring event
router.post('/', async (req: Request, res: Response) => {
  try {
    const { matchId, batsmanId, bowlerId, eventType, runs, overthrows } = req.body;

    // Create the event
    const newEvent = new Event({
      matchId,
      batsmanId,
      bowlerId,
      eventType,
      runs,
      overthrows
    });

    // Save the event
    await newEvent.save();

    // Fetch the match and players
    const match = await Match.findById(matchId);
    const batsman = await Player.findById(batsmanId);
    const bowler = await Player.findById(bowlerId);

    if (!match || !batsman || !bowler) return res.status(404).json({ message: 'Match, Batsman, or Bowler not found' });

    // Handle different event types
    switch (eventType) {
      case 'normal':
        batsman.runs += runs;
        bowler.ballsBowled += 1;
        match.balls += 1;
        match.overs = Math.floor(match.balls / 6);
        match.runsScored += runs;
        break;

      case 'wide':
        bowler.ballsBowled += 1;
        match.extras.wides += runs + 1; // Wide + additional runs
        match.runsScored += runs + 1;   // All runs to the team total
        break;

      case 'noball':
        match.extras.noballs += 1;
        if (runs > 1) batsman.runs += runs - 1; // Batsman gets runs minus 1 for noball
        match.runsScored += runs;               // All runs added to team total
        bowler.ballsBowled += 1;
        break;

      case 'overthrow':
        batsman.runs += runs;                   // All overthrow runs to batsman
        match.extras.overthrows += overthrows;  // Add overthrows to extras
        match.runsScored += runs;               // Add to team total
        match.balls += 1;
        bowler.ballsBowled += 1;
        break;

      case 'bye':
        match.extras.byes += runs; // Add to byes
        match.runsScored += runs;  // Team total
        match.balls += 1;
        bowler.ballsBowled += 1;
        break;

      case 'legbye':
        match.extras.legbyes += runs; // Add to leg-byes
        match.runsScored += runs;     // Team total
        match.balls += 1;
        bowler.ballsBowled += 1;
        break;

      case 'wicket':
        match.wicketsLost += 1; // Increment team wickets lost
        bowler.wickets += 1;    // Bowler gets credit for the wicket
        match.balls += 1;
        bowler.ballsBowled += 1;
        break;

      default:
        return res.status(400).json({ message: 'Invalid event type' });
    }

    // Save updated entities
    await batsman.save();
    await bowler.save();
    await match.save();

    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: 'Error logging event', error });
  }
});

export const eventRouter = router;
