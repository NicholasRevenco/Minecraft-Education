function pyramid(baesLength: number) {
    let pos1: Position;
    let pos2: Position;
    let orePos: Position;
    let chck: number;
    let fluidPos: Position;
    let mainBlocks = [GRASS, GRASS, GRASS, GRASS, GRANITE, COBBLESTONE, DIRT]
    let ore = [COAL_ORE, COAL_ORE, GOLD_ORE, EMERALD_ORE, DIAMOND_ORE]
    let height = 0
    let newLength = baesLength
    for (let i = 1; i < newLength - randint(0, 3); i++) {
        pos1 = pos(i, height, i)
        pos2 = pos(newLength, height, newLength - 1)
        blocks.fill(mainBlocks[randint(0, mainBlocks.length - 1)], pos1, pos2, FillOperation.Replace)
        // replace random blocks with ore
        for (let j = 0; j < randint(0, newLength); j++) {
            orePos = pos(randint(i, newLength), height, randint(i, newLength))
            blocks.place(ore[randint(0, ore.length - 1)], orePos)
        }
        chck = randint(1, 20)
        if ([1, 2, 3].indexOf(chck) >= 0) {
            fluidPos = pos(randint(i, newLength), height, randint(i, newLength))
            blocks.place(WATER, fluidPos)
        } else if (chck == 4) {
            fluidPos = pos(randint(i, newLength), height, randint(i, newLength))
            blocks.place(LAVA, fluidPos)
        }
        
        newLength -= 1
        height += 1
    }
}

// player.on_chat("p", pyramid)
player.onChat("v", function valley(baseLength: number) {
    let posStart: Position;
    let xLoc: number;
    let yLoc: number;
    for (let i = 0; i < 5; i++) {
        posStart = player.position()
        xLoc = posStart.getValue(Axis.X)
        yLoc = posStart.getValue(Axis.Y)
        player.teleport(pos(baseLength - 10, 0, 0))
        pyramid(baseLength)
        player.teleport(pos(-15, 0, 8))
        pyramid(baseLength)
        player.teleport(pos(baseLength - 10, 0, 0))
    }
})
//  remember to add blocks to Agent's inventory
function agentBuildSquare(howLong: number) {
    for (let x = 0; x < 4; x++) {
        for (let i = 0; i < howLong - 1; i++) {
            agent.move(FORWARD, 1)
        }
        agent.turn(TurnDirection.Left)
    }
}

//  reposition agent so square is complete and ready for another
//  to do, we should add a roof/floor
//  to do
function agentBuildFloor(howLong: number) {
    agent.teleport(pos(5, 5, 0), EAST)
    blocks.fill(WATER, pos(5, 5, 0), pos(4 + howLong, 4 + howLong, howLong - 1), FillOperation.Replace)
    agent.setAssist(PLACE_ON_MOVE, true)
    agent.setSlot(1)
    for (let j = 0; j < howLong; j++) {
        for (let i = 0; i < howLong - 1; i++) {
            agent.move(FORWARD, 1)
        }
        if (j % 2 == 1) {
            agent.turn(TurnDirection.Left)
            agent.move(FORWARD, 1)
            agent.turn(TurnDirection.Left)
        } else {
            agent.turn(TurnDirection.Right)
            agent.move(FORWARD, 1)
            agent.turn(TurnDirection.Right)
        }
        
    }
    agent.move(UP, 1)
    agent.turn(RIGHT)
    agent.move(FORWARD, 1)
    agent.setAssist(PLACE_ON_MOVE, true)
}

player.onChat("agent", function summonAgent() {
    agent.teleportToPlayer()
})
player.onChat("wall", function agentBuildWall(howLong: any) {
    for (let i = 0; i < howLong; i++) {
        agent.move(FORWARD, 1)
    }
})
// player.on_chat("square", agentBuildSquare)
player.onChat("b", function agentBuildRoom(howLong: number, howHigh: any) {
    agentBuildFloor(howLong)
    //  using agentBuildSquare function, create as many squares as we want for a room
    for (let h = 0; h < howHigh; h++) {
        agentBuildSquare(howLong)
        agent.move(UP, 1)
        agent.setAssist(PLACE_ON_MOVE, false)
        agent.move(RIGHT, 1)
        agent.setAssist(PLACE_ON_MOVE, true)
    }
})
player.onChat("a", function a(vari: number) {
    let i: number;
    player.teleport(pos(vari / 2, 2, vari / 2))
    agent.setAssist(PLACE_ON_MOVE, true)
    agent.setSlot(4)
    for (i = 0; i < 5; i++) {
        agent.teleport(pos(randint(-vari / 3 + 1, vari / 3 - 1), 0, randint(-vari / 3 + 1, vari / 3 - 1)), NORTH)
        agent.move(FORWARD, 1)
    }
    let animals = [SQUID, TROPICAL_FISH, SQUID, SEA_TURTLE]
    for (i = 0; i < 10; i++) {
        mobs.spawn(animals[randint(0, animals.length - 1)], pos(0, 0, 0))
    }
    agent.teleportToPlayer()
    agent.setAssist(PLACE_ON_MOVE, true)
    agent.setSlot(3)
    for (i = 0; i < vari / 3; i++) {
        agent.move(FORWARD, 1)
        agent.move(FORWARD, 1)
        agent.move(FORWARD, 1)
        agent.move(UP, 1)
        agent.turn(RIGHT)
    }
})
player.onChat("c", function c(vari: number) {
    blocks.fill(GLASS, pos(0, 0, 0), pos(vari, vari, vari), FillOperation.Replace)
    blocks.fill(WATER, pos(1, 1, 1), pos(vari - 1, vari, vari - 1), FillOperation.Replace)
    blocks.fill(SAND, pos(1, 1, 1), pos(vari - 1, 1, vari - 1), FillOperation.Replace)
})
