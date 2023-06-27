def pyramid(baesLength):

    mainBlocks = [GRASS, GRASS, GRASS, GRASS, GRANITE, COBBLESTONE, DIRT]
    ore = [COAL_ORE, COAL_ORE, GOLD_ORE, EMERALD_ORE, DIAMOND_ORE]
    height = 0
    newLength = baesLength

    for i in range(1, newLength-randint(0, 3)):
        pos1 = pos(i, height, i)
        pos2 = pos(newLength, height, newLength-1)

        blocks.fill(mainBlocks[randint(0, len(mainBlocks)-1)], pos1, pos2, FillOperation.REPLACE)
        

        #replace random blocks with ore

        for j in range(randint(0, newLength)):
            orePos = pos(randint(i, newLength), height, randint(i, newLength))
            blocks.place(ore[randint(0, ore.length-1)], orePos)

        chck = randint(1, 20)
        if chck in (1, 2, 3):
            fluidPos = pos(randint(i, newLength), height, randint(i, newLength))
            blocks.place(WATER, fluidPos)
        elif chck == 4:
            fluidPos = pos(randint(i, newLength), height, randint(i, newLength))
            blocks.place(LAVA, fluidPos)

        
        newLength -= 1
        height += 1

def valley(baseLength):
    for i in range(0, 5):
        posStart = player.position()
        xLoc = posStart.get_value(Axis.X)
        yLoc = posStart.get_value(Axis.Y)
        player.teleport(pos(baseLength-10, 0, 0))
        pyramid(baseLength)
        player.teleport(pos(-15, 0, 8))
        pyramid(baseLength)
        player.teleport(pos(baseLength-10, 0, 0))
#player.on_chat("p", pyramid)
player.on_chat("v", valley)

def summonAgent():
    agent.teleport_to_player()

# remember to add blocks to Agent's inventory
def agentBuildWall(howLong):
    
    for i in range(howLong):
        agent.move(FORWARD, 1)

def agentBuildSquare(howLong):
    for x in range(4):
        for i in range(howLong-1):
            agent.move(FORWARD, 1)
        agent.turn(TurnDirection.LEFT)

    # reposition agent so square is complete and ready for another

def agentBuildRoom(howLong, howHigh):
    agentBuildFloor(howLong)
    # using agentBuildSquare function, create as many squares as we want for a room
    for h in range(howHigh):
        agentBuildSquare(howLong)
        agent.move(UP, 1)
        agent.set_assist(PLACE_ON_MOVE, False)
        agent.move(RIGHT, 1)
        agent.set_assist(PLACE_ON_MOVE, True)

    # to do, we should add a roof/floor

# to do
def agentBuildFloor(howLong):
    agent.teleport(pos(5, 5, 0), EAST)
    blocks.fill(WATER, pos(5, 5, 0), pos(4+howLong, 4+howLong, howLong-1), FillOperation.REPLACE)
    agent.set_assist(PLACE_ON_MOVE, True)
    agent.set_slot(1)
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
    agent.move(UP, 1)
    agent.turn(RIGHT)
    agent.move(FORWARD, 1)
    agent.set_assist(PLACE_ON_MOVE, True)
    

player.on_chat("agent", summonAgent)
player.on_chat("wall", agentBuildWall)
#player.on_chat("square", agentBuildSquare)
player.on_chat("b", agentBuildRoom)

def a(vari):
    player.teleport(pos(vari/2, 2, vari/2))


    agent.set_assist(PLACE_ON_MOVE, True)
    agent.set_slot(4)
    for i in range(5):
        agent.teleport(pos(randint(-vari/3+1, vari/3-1), 0, randint(-vari/3+1, vari/3-1)), NORTH)
        agent.move(FORWARD, 1)

    animals = [SQUID, TROPICAL_FISH, SQUID, SEA_TURTLE]
    for i in range(10):
        mobs.spawn(animals[randint(0, len(animals)-1)], pos(0, 0, 0))
    agent.teleport_to_player()
    agent.set_assist(PLACE_ON_MOVE, True)
    agent.set_slot(3)

    for i in range(vari/3):
        agent.move(FORWARD, 1)
        agent.move(FORWARD, 1)
        agent.move(FORWARD, 1)
        agent.move(UP, 1)
        agent.turn(RIGHT)
        
        
player.on_chat("a", a)

def c(vari):
    blocks.fill(GLASS, pos(0, 0, 0), pos(vari, vari, vari), FillOperation.REPLACE)
    blocks.fill(WATER, pos(1, 1, 1), pos(vari-1, vari, vari-1), FillOperation.REPLACE)
    blocks.fill(SAND, pos(1, 1, 1), pos(vari-1, 1, vari-1), FillOperation.REPLACE)
player.on_chat("c", c)