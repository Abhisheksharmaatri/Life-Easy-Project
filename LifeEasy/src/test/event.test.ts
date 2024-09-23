import chai from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import { app } from '../src/index';  // Assuming app.ts exports your Express instance
import { Match } from '../src/models/match.model';
import { Player } from '../src/models/player.model';

chai.use(chaiHttp);
const { expect } = chai;

describe('Event Route', () => {
  let matchStub: any;
  let playerStub: any;

  before(() => {
    // Stub the database models to avoid hitting the real DB
    matchStub = sinon.stub(Match, 'findById');
    playerStub = sinon.stub(Player, 'findById');
  });

  after(() => {
    matchStub.restore();
    playerStub.restore();
  });

  it('should handle normal run event', async () => {
    // Setup stubs for match and player
    matchStub.resolves(new Match({ runsScored: 50, balls: 30 }));
    playerStub.onCall(0).resolves(new Player({ runs: 20 }));
    playerStub.onCall(1).resolves(new Player({ ballsBowled: 12 }));
    
    const res = await chai.request(app).post('/events').send({
      matchId: 'mockMatchId',
      batsmanId: 'mockBatsmanId',
      bowlerId: 'mockBowlerId',
      eventType: 'normal',
      runs: 4
    });

    expect(res).to.have.status(201);
    expect(res.body).to.have.property('eventType', 'normal');

    // Check if the match and player were updated correctly
    const matchUpdate = Match.findById.getCall(0).returnValue;
    expect(matchUpdate.runsScored).to.equal(54); // 50 + 4 runs
    expect(matchUpdate.balls).to.equal(31);      // 30 + 1 ball bowled
  });

  it('should handle wide event', async () => {
    matchStub.resolves(new Match({ runsScored: 60, balls: 50, extras: { wides: 2 } }));
    playerStub.onCall(0).resolves(new Player({ runs: 20 }));
    playerStub.onCall(1).resolves(new Player({ ballsBowled: 15 }));

    const res = await chai.request(app).post('/events').send({
      matchId: 'mockMatchId',
      batsmanId: 'mockBatsmanId',
      bowlerId: 'mockBowlerId',
      eventType: 'wide',
      runs: 1
    });

    expect(res).to.have.status(201);
    expect(res.body).to.have.property('eventType', 'wide');

    // Check if the match and player were updated correctly
    const matchUpdate = Match.findById.getCall(0).returnValue;
    expect(matchUpdate.runsScored).to.equal(62);  // 60 + 1 run for wide
    expect(matchUpdate.extras.wides).to.equal(3); // 2 + 1 wide
  });

  it('should handle no-ball with runs event', async () => {
    matchStub.resolves(new Match({ runsScored: 100, extras: { noballs: 1 } }));
    playerStub.onCall(0).resolves(new Player({ runs: 30 }));
    playerStub.onCall(1).resolves(new Player({ ballsBowled: 40 }));

    const res = await chai.request(app).post('/events').send({
      matchId: 'mockMatchId',
      batsmanId: 'mockBatsmanId',
      bowlerId: 'mockBowlerId',
      eventType: 'noball',
      runs: 3
    });

    expect(res).to.have.status(201);
    expect(res.body).to.have.property('eventType', 'noball');

    const matchUpdate = Match.findById.getCall(0).returnValue;
    expect(matchUpdate.runsScored).to.equal(103);  // 100 + 3 runs
    expect(matchUpdate.extras.noballs).to.equal(2); // 1 + 1 no-ball
  });
});
