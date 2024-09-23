import { Router, Request, Response } from 'express';
import { Match } from '../models/match.model';
import {Team} from '../models/team.model';

const router = Router();

// Create a new match
router.post('/', async (req: Request, res: Response) => {
  try {
    const teamA = await  Team.findById(req.body.teamA);
    const teamB = await Team.findById(req.body.teamB);
    if (!teamA || !teamB) return res.status(404).json({ message: 'Team not found' });
    const newMatch = new Match({
      teamA: teamA,
      teamB: teamB,
      onStrikeBatsman: teamA.players[0],
      nonStrikeBatsman: teamA.players[1],
      bowler: teamB.players[0]
    });
    await newMatch.save();
    res.status(201).json({success:true, match: newMatch});
  } catch (error) {
    res.status(400).json({ message: 'Error creating match', error: error });
  }
});

// Get details of a match
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const match = await Match.findById(req.params.id).populate('teamA teamB');
    if (!match) return res.status(404).json({ message: 'Match not found' });
    res.status(200).json({success:true, match: match});
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving match', error });
  }
});

// Get all matches
router.get('/', async (req: Request, res: Response) => {
  try {
    const matches = await Match.find().populate('teamA teamB');
    res.status(200).json({success:true, matches: matches});
  } catch (error) {
    res.status(500).json({ message: 'Error fetching matches', error });
  }
});

//Update:
// Update a match by ID
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const updatedMatch = await Match.findByIdAndUpdate
      (req.params.id, req.body, { new: true });
    if (!updatedMatch) return res.status(404).json({message: 'Match not found' });
    res.status(200).json({ success: true, match: updatedMatch });
  } catch (error) {
    res.status(500).json({ message: 'Error updating match', error });
  }
}
);

export const matchRouter = router;
