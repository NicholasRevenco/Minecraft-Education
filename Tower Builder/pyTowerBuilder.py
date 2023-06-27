# parameter one of the call function should be the width of the building
# parameter two fo the call function should be the height of the building

agent.set_item(PILLAR_QUARTZ_BLOCK, 64, 1)
agent.set_item(GLASS_PANE, 64, 2)
agent.set_item(QUARTZ_SLAB, 64, 3)

# remember to add blocks to Agent's inventory
def agentBuildWall(howLong):
    
    for i in range(howLong):
        agent.move(FORWARD, 1)

def agentBuildSquare(howLong):
    for x in range(4):
        for i in range(howLong-1):
            agent.move(FORWARD, 1)
        agent.turn(TurnDirection.RIGHT)

# building builder
def agentBuildRoom(howLong, howHigh):
    agent.teleport(pos(5, 5, 0), WEST)
    # using agentBuildSquare function, create as many squares as we want for a room
    for h in range(howHigh):
        if h % 2 == 1:
            agent.set_slot(1)
        else:
            agent.set_slot(2)
        agentBuildSquare(howLong)
        agent.move(UP, 1)
        agent.set_assist(PLACE_ON_MOVE, False)
        agent.move(LEFT, 1)
        agent.set_assist(PLACE_ON_MOVE, True)
    agentBuildRoof(howLong)

# roof function
def agentBuildRoof(howLong):
    agent.set_slot(3)
    for j in range(howLong):
        for i in range(howLong-1):
            agent.move(FORWARD, 1)
        if j % 2 == 1:
            agent.turn(TurnDirection.LEFT)
            agent.move(FORWARD, 1)
            agent.turn(TurnDirection.LEFT)
        else:
            agent.turn(TurnDirection.RIGHT)
            agent.move(FORWARD, 1)
            agent.turn(TurnDirection.RIGHT)

player.on_chat("building", agentBuildRoom)