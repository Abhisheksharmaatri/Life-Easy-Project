import mongoose from 'mongoose';
import { expect } from 'chai';
import { Match } from '../src/models/match.model';

describe('Match Schema', () => {
  before(async () => {
    // Before any tests, connect to a test database
    await mongoose.connect('mongodb://localhost:27017/test_db', { useNewUrlParser: true });
  });

  after(async () => {
    // After all tests, disconnect from the database
    await mongoose.disconnect();
  });

  it('should create a match with default values', async () => {
    const match = new Match({
      teamA: new mongoose.Types.ObjectId(),
      teamB: new mongoose.Types.ObjectId(),
      onStrikeBatsman: new mongoose.Types.ObjectId(),
      nonStrikeBatsman: new mongoose.Types.ObjectId(),
      bowler: new mongoose.Types.ObjectId(),
    });

    await match.save();

    // Assertions
    expect(match.overs).to.equal(0);
    expect(match.balls).to.equal(0);
    expect(match.wicketsLost).to.equal(0);
    expect(match.runsScored).to.equal(0);
    expect(match.extras.wides).to.equal(0);
    expect(match.extras.noballs).to.equal(0);
    expect(match.extras.byes).to.equal(0);
    expect(match.extras.legbyes).to.equal(0);
    expect(match.extras.overthrows).to.equal(0);
  });

  it('should update extras on the match schema', async () => {
    const match = new Match({
      teamA: new mongoose.Types.ObjectId(),
      teamB: new mongoose.Types.ObjectId(),
      onStrikeBatsman: new mongoose.Types.ObjectId(),
      nonStrikeBatsman: new mongoose.Types.ObjectId(),
      bowler: new mongoose.Types.ObjectId(),
      extras: { wides: 2, noballs: 1 }
    });

    await match.save();

    // Assertions
    expect(match.extras.wides).to.equal(2);
    expect(match.extras.noballs).to.equal(1);
    expect(match.extras.byes).to.equal(0);
    expect(match.extras.legbyes).to.equal(0);
    expect(match.extras.overthrows).to.equal(0);
  });
});
