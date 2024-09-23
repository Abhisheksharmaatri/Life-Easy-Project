import { Router, Request, Response } from 'express';
import { Player } from '../models/player.model';

const router = Router();

// Create a new player
router.post('/', async (req: Request, res: Response) => {
  try {
    const newPlayer = new Player(req.body);
    await newPlayer.save();
    res.status(201).json(newPlayer);
  } catch (error) {
    res.status(400).json({ message: 'Error creating player', error });
  }
});

// Get player stats
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const player = await Player.findById(req.params.id).populate('teamId');
    if (!player) return res.status(404).json({ message: 'Player not found' });
    res.status(200).json(player);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving player', error });
  }
});

export const playerRouter = router;
