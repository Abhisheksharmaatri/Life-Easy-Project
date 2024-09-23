import express, { Request, Response } from 'express';
import { Team } from '../models/team.model'; // Adjust the path as necessary
import {Player} from '../models/player.model'; // Adjust the path as necessary

const router = express.Router();

// Get all teams
router.get('/', async (req: Request, res: Response) => {
    try {
        const teams = await Team.find();
        res.status(200).json({
            teams: teams,
            success: true
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching teams', error });
    }
});

// Get a single team by ID
router.get('/:id', async (req: Request, res: Response) => {
    try {
        const team = await Team.findById(req.params.id);
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }
        res.status(200).json({
            team: team,
            success: true
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching team', error });
    }
});

// Create a new team
router.post('/', async (req: Request, res: Response) => {
    try {
        const newTeam = new Team(req.body);
        const savedTeam = await newTeam.save();
        res.status(201).json({
            team: savedTeam,
            success: true
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating team', error });
    }
});

// Update a team by ID
router.put('/:id', async (req: Request, res: Response) => {
    try {
        const updatedTeam = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTeam) {
            return res.status(404).json({ message: 'Team not found' });
        }
        res.status(200).json({
            team: updatedTeam,
            success: true
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating team', error });
    }
});

// Delete a team by ID
router.delete('/:id', async (req: Request, res: Response) => {
    try {
        const deletedTeam = await Team.findByIdAndDelete(req.params.id);
        if (!deletedTeam) {
            return res.status(404).json({ message: 'Team not found' });
        }
        res.status(200).json({ message: 'Team deleted successfully', success: true });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting team', error });
    }
});

router.get('/:id/players', async (req: Request, res: Response) => {
    try {
        const team = await Team.findById(req.params.id).populate('players');
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }
        res.status(200).json({
            players: team.players,
            success: true
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching team players', error });
    }
});

export const teamRouter = router;