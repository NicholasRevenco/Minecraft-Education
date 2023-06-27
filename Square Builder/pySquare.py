def on_on_chat():
    pass
player.on_chat("run", on_on_chat)

def summonAgent():
    player.say("Agent come over here!")
    agent.teleport_to_player()

def agentBuildWall(howLong):
    agent.set_slot(1)
    for i in range(howLong):
        agent.set_assist(PLACE_ON_MOVE, True)
        agent.move(FORWARD, 1)

def agentBuildSquare(howLong):
    agent.set_slot(1)
    for j in range(4):
        for i in range(howLong):
            agent.set_assist(PLACE_ON_MOVE, True)
            agent.move(FORWARD, 1)
        agent.turn(TurnDirection.LEFT)

player.on_chat('agent', summonAgent)
player.on_chat('wall', agentBuildWall)
player.on_chat('square', agentBuildSquare)